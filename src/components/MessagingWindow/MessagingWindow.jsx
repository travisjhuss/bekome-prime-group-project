import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  TextField,
  Box,
  Typography,
  IconButton,
  Paper,
  Avatar,
  Divider,
} from '@material-ui/core';
import { Close, Send } from '@material-ui/icons';
import io from 'socket.io-client';
import useStyles from '../../hooks/useStyles';

const socket = io.connect('http://localhost:5001');

function MessagingWindow() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id, first_name, pic, user_type } = useSelector((store) => store.user);
  const groupToMessage =
    user_type === 'client'
      ? useSelector((store) => store.exploreReducer)
      : useSelector((store) => store.interestedClients);
  const messages = useSelector((store) => store.messages.messagesReducer);
  const { messageId } = useSelector((store) => store.messages.windowOpen);
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = (event) => {
    event.preventDefault();
    socket.emit('SEND_MESSAGE', {
      sender_users_id: id,
      recipient_users_id: messageId,
      message: messageText,
    });
    setMessageText('');
  };

  const messageName = groupToMessage.find(
    (item) =>
      item.clients_users_id === messageId ||
      item.providers_users_id === messageId
  )?.first_name;

  return (
    <Paper className={classes.messagingWindow} elevation={4}>
      <Box
        display="flex"
        px={1}
        paddingBottom={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body2">
          <b>Message {messageName}</b>
        </Typography>
        <IconButton
          size="small"
          onClick={() => dispatch({ type: 'CLOSE_MESSAGE_WINDOW' })}
        >
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <Box className={classes.messagingBody}>
        {messages.map((item) => (
          <Box p={1}>
            <Typography variant="body2">
              <b>
                {item.sender_name}: {item.message}
              </b>
            </Typography>
          </Box>
        ))}
      </Box>
      <form onSubmit={handleSendMessage}>
        <Box display="flex" alignItems="center">
          <TextField
            fullWidth
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
          />
          <IconButton color="primary" type="submit">
            <Send />
          </IconButton>
        </Box>
      </form>
    </Paper>
  );
}

export default MessagingWindow;
