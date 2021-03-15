const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// POST route for adding providers to a client's favorites
router.post('/', rejectUnauthenticated, (req, res) => {
  const { id } = req.body;

  const favQuery = `
    INSERT INTO 
      "clients_providers_favs" ("clients_users_id", "providers_users_id")
    VALUES ($1, $2);
  `;

  pool
    .query(favQuery, [req.user.id, id])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('error in favorite.router POST', err);
    });
});

// DELETE route to remove a provider from a client's favorites
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const deleteFavQuery = `
    DELETE FROM "clients_providers_favs"
    WHERE "clients_users_id" = $1 AND "providers_users_id" = $2;
  `;

  pool
    .query(deleteFavQuery, [req.user.id, req.params.id])
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log('error in favorite.router DELETE', err);
    });
});

module.exports = router;
