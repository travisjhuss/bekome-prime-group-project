const pool = require('../modules/pool');

const socketIo = (socket) => {
  // ID here is the socket client ID
  const { id } = socket.client;
  console.log(`User connected: ${id}`);
  // POST route for messages sent through socket.io to database
  socket.on('SEND_MESSAGE', (data) => {
    const sqlText = `
      INSERT INTO "messages" (
        "conversation",
        "sender_users_id", 
        "recipient_users_id", 
        "message"
      ) VALUES ($1, $2, $3, $4);
    `;
    pool
      .query(sqlText, [
        data.conversation,
        data.sender_users_id,
        data.recipient_users_id,
        data.message,
      ])
      .then(socket.broadcast.emit('RECEIVE_MESSAGE')) // This triggers a GET route on client
      .catch((err) => {
        console.log(
          `Error in messaging on socket.io with query ${sqlText}`,
          err
        );
      });
  });
};

module.exports = socketIo;
