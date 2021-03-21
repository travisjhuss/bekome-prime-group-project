const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Gets the full name of the user alongside their id/email/user_type etc
router.get('/name', rejectUnauthenticated, (req, res) => {
  const { id, user_type } = req.user;
  const sqlText =
    user_type === 'client'
      ? `
        SELECT "first_name", "pic" FROM "clients" 
        WHERE "clients_users_id" = $1;
      `
      : `
        SELECT "first_name", "pic" FROM "providers" 
        WHERE "providers_users_id" = $1;
      `;
  pool
    .query(sqlText, [id])
    .then((result) => res.send(result.rows[0]))
    .catch((err) => {
      console.log(`Error in GET with query ${sqlText}`, err);
      res.sendStatus(500);
    });
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `
    INSERT INTO "users" ("email", "password", "user_type")
    VALUES ($1, $2, $3) RETURNING "id"
  `;

  pool
    .query(queryText, [username, password, req.body.user_type])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
