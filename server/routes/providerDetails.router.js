const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const pool = require('../modules/pool');
const router = express.Router();

// GET route for one provider, transaction
router.get('/:id', rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();

  try {
    await connection.query('BEGIN;');
    // ID of the specific provider for the GET route
    const { id } = req.params;

    // Query #1 - obtains all data from 'providers' and an array of
    // the preference ID's for the specific provider
    const sqlTextInfoPreferences = `
      SELECT "providers".*,
        EXTRACT(YEAR FROM AGE("providers".date_of_birth)) AS "age",
        ARRAY_AGG("providers_preferences".preferences_id) AS "preferences_array" 
      FROM "providers" 
      JOIN "providers_preferences" ON "providers".providers_users_id = 
        "providers_preferences".providers_users_id
      WHERE "providers".providers_users_id = $1 
      GROUP BY "providers".id;
    `;

    const infoPreferences = (
      await connection.query(sqlTextInfoPreferences, [id])
    ).rows[0];

    // Query #2 - Obtains all question ID's and answers for the provider
    const sqlTextQuestionsAnswers = `
      SELECT "questions_id", "answer" FROM "providers_questions"
      WHERE "providers_users_id" = $1;
    `;

    const questionsAnswers = (
      await connection.query(sqlTextQuestionsAnswers, [id])
    ).rows;

    // Checks if this provider is favorited by the user
    const sqlTextSavedProvider = `
      SELECT EXISTS (SELECT "id" FROM "clients_providers_favs" 
      WHERE "clients_users_id" = $1 AND "providers_users_id" = $2);
    `;
    const isSaved = (
      await connection.query(sqlTextSavedProvider, [req.user.id, id])
    ).rows[0].exists;

    // This deletes the 'id' on the providers entry, needed for GROUP BY in SQL
    // Since we only use 'providers_users_id' in app, wanted to delete this to
    // hopefully avoid some confusion on the client side between the id's
    delete infoPreferences.id;

    // Packages the data to send to client
    // questionsAnswers has its own key / value in the object being sent
    const infoToSend = {
      ...infoPreferences,
      questions: questionsAnswers,
      saved: isSaved,
    };

    // Finish transaction
    connection.query('COMMIT;');
    // Send the packaged object to client
    res.send(infoToSend);
  } catch (err) {
    await connection.query('ROLLBACK;');
    console.log('Error in GET in providerDetails.router, rollback:', err);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
