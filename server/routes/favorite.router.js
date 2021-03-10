const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route for adding providers to a client's favorites
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const providerID = req.body.providerID;
    const clientID = req.user.id;
    console.log('providerID:', providerID)
    console.log('clientID', clientID)

    const favQuery = `
    INSERT INTO "clients_providers_favs" ("clients_users_id", "providers_users_id")
    VALUES ($1, $2);
    `;

    pool.query(favQuery, [clientID, providerID])
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log('error in favorite.router POST', err)
    })
});

module.exports = router;
