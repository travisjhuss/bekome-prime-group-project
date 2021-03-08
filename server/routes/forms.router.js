const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for retrieving data from "preferences" table
router.get('/preferences', rejectUnauthenticated, (req, res) => {
  const sqlText = `
        SELECT * FROM "preferences"
        `;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    });
});

// GET route for retrieving data from "questions" table
router.get('/provider_questions', rejectUnauthenticated, (req, res) => {
    const sqlText = `
          SELECT * FROM "questions"
          `;
    pool
      .query(sqlText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
      });
  });

module.exports = router;
