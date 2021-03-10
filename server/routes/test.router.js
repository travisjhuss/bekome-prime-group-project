

const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
router.get('/', (req, res) => {
  res.send('Hello?');
})
// register new account => make new deposit
router.post('/', async (req, res) => {
  // open the connection to our db
  const connection = await pool.connect();
  try {
  // only way to get to this line is if the line before didn't error
  await connection.query('BEGIN;')
  const sqlText = `
            INSERT INTO "account" (name)
            VALUES ($1)
            RETURNING id;
            `;
  const result = await connection.query(sqlText, [req.body.name])
  const secondSqlText = `
            INSERT INTO "register" (acct_id, amount)
            VALUES ($1, $2);
            `;
  await pool.query(secondSqlText, [result.rows[0].id, req.body])
  await connection.query('COMMIT;');
  res.sendStatus(201);
  } catch (error) {
    // rollback changes to before we started with BEGIN
    console.log('error in account.router', error);
    await connection.query('ROLLBACK;');
    res.sendStatus(500)
  } finally {
    // hang up the phone
    // finally excecutes whether or not the queries fail
    connection.release();
  }
})
module.exports = router;