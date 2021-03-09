const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for providers
 */
router.get('/', rejectUnauthenticated, async (req, res) => {

  const connection = await pool.connect();

  try {
    // Begin transaction
    await connection.query('BEGIN;')

    // first query gets array of all providers and relevant data
    const providersSQL = `
      SELECT
      "providers_users_id", "first_name", "last_name", "pic", "video", "location"
      FROM "providers";
    `;
    const providersArray = await connection.query(providersSQL)

    // console.log(providersArray.rows);

    // second query will get answers to questions for specific provider $1
    const answersSQL = `
      SELECT "providers_users_id", "questions_id", "answer" FROM "providers_questions"
      WHERE "providers_questions".providers_users_id = $1;
    `;

    // third query will get pronouns and languages for specific provider $1
    const preferencesSQL = `
      SELECT "preferences".name, "preferences".category FROM "providers_preferences"
      JOIN "preferences" ON "providers_preferences".preferences_id = "preferences".id
      WHERE "providers_preferences".providers_users_id = $1
      AND ("preferences".category = 'languages'
      OR "preferences".category = 'pronouns');
    `;

    const fullProviderArray = [];

    for (let i = 0; i < providersArray.rows.length; i++) {
      const fullProviderObject = {...providersArray.rows[i]};

      // console.log('Provider Data:', providersArray.rows[i])

      const answers = await connection.query(answersSQL, [providersArray.rows[i].providers_users_id])
      // console.log('Answers to questions:', answers.rows)

      fullProviderObject.answers = answers.rows

      const preferences = await connection.query(preferencesSQL, [providersArray.rows[i].providers_users_id])
      // console.log('Languages and pronouns:', preferences.rows)

      fullProviderObject.preferences = preferences.rows
      // console.log(fullProviderObject)

      fullProviderArray.push(fullProviderObject);

      // preferences.rows.forEach(parsePreferences)
    }
    console.log(fullProviderArray);

    await connection.query('COMMIT;');
    res.send(fullProviderArray)
    // function parsePreferences(item) {
    //   let languages = '';
    //   let pronouns = '';
    //   // console.log(item)
    //   if (item.category === 'languages') {
    //     languages += item.name;
    //     console.log('Languages:', languages)
    //   } else if (item.category === 'pronouns') {
    //     pronouns += item.name;
    //     console.log('Pronouns:', pronouns)
    //   }
    // }

  } catch (error) {
    console.log('ERROR getting providers in explore.router', error)
    await connection.query('ROLLBACK;');
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