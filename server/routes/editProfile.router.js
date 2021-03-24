const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for retrieving the client profile to edit using req.user.id
router.get('/client', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT "clients".*,
      ARRAY_AGG("clients_preferences".preferences_id) AS "preferences_array" 
    FROM "clients" 
    JOIN "clients_preferences" ON "clients".clients_users_id 
      = "clients_preferences".clients_users_id
    WHERE "clients".clients_users_id = $1 
    GROUP BY "clients".id;
  `;

  pool
    .query(sqlText, [req.user.id])
    .then((result) => res.send(result.rows[0]))
    .catch((err) => {
      console.log(`Error in GET with query ${sqlText}`, err);
      res.sendStatus(500);
    });
});

// PUT route to handle editing user's client profile
router.put('/client', rejectUnauthenticated, async (req, res) => {
  // start connection to database
  const connection = await pool.connect();
  try {
    // Start transaction
    await connection.query('BEGIN;');
    // first query handles updating the clients table with the personal details
    const firstSqlText = `
      UPDATE "clients"
      SET
      "first_name" = $1,
      "last_name" = $2,
      "pic" = $3,
      "date_of_birth" = $4,
      "write_in_pronouns" = $5,
      "city" = $6,
      "state" = $7,
      "primary_reason" = $8,
      "previous_therapy" = $9,
      "previous_experience" = $10,
      "sliding_scale" = $11
      WHERE "clients_users_id" = $12;
      `;

    await connection.query(firstSqlText, [
      req.body.first_name,
      req.body.last_name,
      req.body.pic,
      req.body.date_of_birth,
      req.body.write_in_pronouns,
      req.body.city,
      req.body.state,
      req.body.primary_reason,
      req.body.previous_therapy,
      req.body.previous_experience,
      req.body.sliding_scale,
      req.user.id,
    ]);
    // delete old preferences to make way for new ones
    const deleteSql = `
      DELETE FROM "clients_preferences"
      WHERE "clients_users_id" = $1;
    `;
    await connection.query(deleteSql, [req.user.id]);
    // replace preferences with new insert
    // Take the preferences array and generate values for query
    const preferenceValues = req.body.preferences_array
      .reduce((valueString, val, i) => (valueString += `($1, $${i + 2}),`), '')
      .slice(0, -1); // Takes off last comma
    // Second sql query to insert preferences into clients_preferences
    const secondSqlText = `
        INSERT INTO "clients_preferences" ("clients_users_id", "preferences_id")
        VALUES ${preferenceValues};
    `;
    await connection.query(secondSqlText, [
      req.user.id,
      ...req.body.preferences_array,
    ]);
    // last action
    await connection.query('COMMIT;');
    // send success status
    res.sendStatus(201);
  } catch (err) {
    console.log('error in PUT edit/client:', err);
    await connection.query('ROLLBACK;');
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

// PUT route to handle editing user's provider profile
router.put('/provider', rejectUnauthenticated, async (req, res) => {
  // start connection with database
  const connection = await pool.connect();
  try {
    // Start transaction
    await connection.query('BEGIN;');
    // first query handles updating the providers table with the personal details
    const firstSqlText = `
      UPDATE "providers"
      SET 
      "first_name" = $1, 
      "last_name" = $2, 
      "pic" = $3, 
      "video" = $4,
      "city" = $5,
      "state" = $6,
      "date_of_birth" = $7, 
      "write_in_pronouns" = $8, 
      "background" = $9,
      "strengths" = $10,
      "approach" = $11,
      "sliding_scale" = $12,
      "accepting_clients" = $13,
      "license_number" = $14
      WHERE "providers_users_id" = $15
      `;
    await connection.query(firstSqlText, [
      req.body.first_name,
      req.body.last_name,
      req.body.pic,
      req.body.video,
      req.body.city,
      req.body.state,
      req.body.date_of_birth,
      req.body.write_in_pronouns,
      req.body.background,
      req.body.strengths,
      req.body.approach,
      req.body.sliding_scale,
      req.body.accepting_clients,
      req.body.license_number,
      req.user.id,
    ]);
    // delete old preferences before inserting new
    const deleteSql = `
      DELETE FROM "providers_preferences"
      WHERE "providers_users_id" = $1;
    `;
    await connection.query(deleteSql, [req.user.id]);
    // insert new preferences
    // Take the preferences array and generate values for query
    const preferenceValues = req.body.preferences_array
      .reduce((valueString, val, i) => (valueString += `($1, $${i + 2}),`), '')
      .slice(0, -1); // Takes off last comma
    // Second sql query to insert preferences into clients_preferences
    const secondSqlText = `
      INSERT INTO "providers_preferences" ("providers_users_id", "preferences_id")
      VALUES ${preferenceValues};
    `;
    await connection.query(secondSqlText, [
      req.user.id,
      ...req.body.preferences_array,
    ]);
    // update questions
    // Take the questions array and use the same SQL query for each
    const thirdSqlText = `
      UPDATE "providers_questions"
      SET
      "answer" = $1,
      "displayed_on_card" = $2
      WHERE "questions_id" = $3 AND "providers_users_id" = $4;
      `;

    req.body.questions.forEach(async (question) => {
      try {
        await connection.query(thirdSqlText, [
          question.answer,
          question.displayed_on_card,
          question.questions_id,
          req.user.id,
        ]);
      } catch (err) {
        console.log('error in put to providers_questions:', err);
        await connection.query('ROLLBACK;');
        res.sendStatus(500);
      }
    });
    // last action
    await connection.query('COMMIT;');
    // send success status
    res.sendStatus(201);
  } catch (err) {
    console.log('error in PUT edit/provider:', err);
    await connection.query('ROLLBACK;');
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

module.exports = router;
