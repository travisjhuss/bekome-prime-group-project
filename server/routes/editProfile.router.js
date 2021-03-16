const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/client', rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();
  try {
    // Start transaction
    await connection.query('BEGIN;');
    const sqlText = `
      SELECT "clients".*,
      ARRAY_AGG("clients_preferences".preferences_id) AS "preferences_array" 
      FROM "clients" JOIN "clients_preferences" ON 
      "clients".clients_users_id = 
      "clients_preferences".clients_users_id
      WHERE "clients".clients_users_id = $1 GROUP BY "clients".id;
      `;
    // req.params.id?
    const clientAnswers = await connection.query(sqlText, [req.user.id]);

    // last action
    await connection.query('COMMIT;');
    // send data from DB
    res.send(clientAnswers.rows[0]);
  } catch (err) {
    console.log('error in GET edit/client:', err);
    await connection.query('ROLLBACK;');
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

router.put('/client/:id', rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();
  try {
    // Start transaction
    await connection.query('BEGIN;');

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

router.put('/provider/:id', rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();
  try {
    // Start transaction
    await connection.query('BEGIN;');

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
