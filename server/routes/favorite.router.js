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

    // this is the old version of the query. if the new version has any issues, return to this one

    // const favQuery = `
    // INSERT INTO "clients_providers_favs" ("clients_users_id", "providers_users_id")
    // VALUES ($1, $2);
    // `;

    // this query checks to see if the data already exists in a row. if it does, it will not POST a duplicate row
    const favQuery = `
    INSERT INTO "clients_providers_favs" ("clients_users_id", "providers_users_id")
    SELECT $1, $2
    WHERE
        NOT EXISTS (
            SELECT "clients_users_id", "providers_users_id" FROM "clients_providers_favs"
            WHERE "clients_users_id" = $1 AND "providers_users_id" = $2);
    `;

    pool.query(favQuery, [clientID, providerID])
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log('error in favorite.router POST', err)
    })
});

router.delete('/', rejectUnauthenticated, (req, res) => {
    const providerID = req.body.id;
    const clientID = req.user.id;
    console.log('providerID:', providerID)
    console.log('clientID', clientID)

    const deleteFavQuery = `
    
    `
});

module.exports = router;
