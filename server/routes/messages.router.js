const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const socket = require('socket.io');

// Making socket.io instance, adding CORS
const io = socket(5001, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Initializing socket.io connection
io.on('connection', (socket) => {
  const { id } = socket.client;
  console.log(`User connected: ${id}`);
  // POST route for messages sent through socket.io to database
  socket.on('SEND_MESSAGE', (data) => {
    const sqlText = `
      INSERT INTO "messages" (
        "sender_users_id", 
        "sender_name", 
        "sender_pic",
        "recipient_users_id", 
        "message"
      ) VALUES ($1, $2, $3, $4, $5);
    `;
    pool
      .query(sqlText, [
        data.sender_users_id,
        data.sender_name,
        data.sender_pic,
        data.recipient_users_id,
        data.message,
      ])
      .then(io.emit('RECEIVE_MESSAGE')) // This triggers a GET route on client
      .catch((err) => {
        console.log(`Error in messaging with query ${sqlText}`, err);
      });
  });
});

// GET route to retrieve message history from the database
// Array is grouped by 'conversation', with the messages in their own array
// of objects with the key of 'message_log'
router.get('/', (req, res) => {
  const sqlText = `
    SELECT "messages".conversation, 
      "clients".first_name AS "clients_name", 
      "clients".pic AS "clients_pic", 
      "providers".first_name AS "providers_name",
      "providers".pic AS "providers_pic",
      JSON_AGG("messages".* ORDER BY "messages".timestamp) AS "message_log"
    FROM "providers"
    JOIN "messages" ON "messages".recipient_users_id = 
      "providers".providers_users_id 
      OR "messages".sender_users_id = "providers".providers_users_id
    JOIN "clients" ON "clients".clients_users_id = "messages".recipient_users_id 
      OR "clients".clients_users_id = "messages".sender_users_id
    WHERE "sender_users_id" = $1 OR "recipient_users_id" = $1
    GROUP BY "conversation", 
      "clients".first_name, 
      "clients".pic, 
      "providers".first_name,
      "providers".pic;
  `;

  pool
    .query(sqlText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`Error in GET with query ${sqlText}`, err);
      res.sendStatus(500);
    });
});

// Toggle a message to 'read' when a recipient opens it
router.put('/', (req, res) => {
  const { id } = req.body;
  const sqlText = `
    UPDATE "messages" SET "read_by_recipient" = TRUE WHERE "id" = $1;
  `;

  pool
    .query(sqlText, [id])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(`Error in PUT with query ${sqlText}`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
