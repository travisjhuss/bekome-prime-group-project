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
  const { id, user_type } = useSelector((store) => store.user);
  const { conversationId } = useSelector((store) => store.messages.windowOpen);
  const chat = useSelector((store) => store.messages.messagesReducer).find(
    (item) => item.conversation === conversationId
  );
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = (event) => {
    event.preventDefault();
    socket.emit('SEND_MESSAGE', {
      sender_users_id: id,
      recipient_users_id: messageId,
      message: messageText,
      conversation: conversationId,
    });
    setMessageText('');
  };

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
          <b>
            Conversation with{' '}
            {user_type === 'client' ? chat.providers_name : chat.clients_name}
          </b>
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
        {chat.message_log?.map((item) => (
          <Box
            m={1}
            display="flex"
            flexDirection={
              item.recipient_users_id === id ? 'row' : 'row-reverse'
            }
          >
            <Box
              p={1.5}
              className={
                item.recipient_users_id === id
                  ? classes.notUserBubble
                  : classes.userBubble
              }
            >
              <Typography variant="body2">{item.message}</Typography>
            </Box>
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
