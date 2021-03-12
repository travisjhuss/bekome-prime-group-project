const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for interested clients
 * This route will accept the provider's id from the interestedClients saga and query the database table named "clients_providers_favs and return corresponding clients ids"
 */
 router.get('/', rejectUnauthenticated, (req, res) => {
     const id = req.user.id;

     const queryValues = [id]
     // SELECT the client id from the client_providers_favs table WHERE the providers_user_id = (id passed in from interestedClients saga)
    const sqlText = `
    SELECT "clients".first_name, "clients".last_name, "clients".pic, "clients".primary_reason
    FROM "clients"
    JOIN "clients_providers_favs" ON "clients_providers_favs".clients_users_id = "clients".clients_users_id
    WHERE "clients_providers_favs".providers_users_id = $1;
          `;
    pool
      .query(sqlText, queryValues)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
      });
  });

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;

