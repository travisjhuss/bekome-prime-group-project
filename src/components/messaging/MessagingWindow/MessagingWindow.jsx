import { useSelector, useDispatch } from 'react-redux';
import {
  TextField,
  Box,
  Typography,
  IconButton,
  Paper,
  Divider,
} from '@material-ui/core';
import { Close, Send } from '@material-ui/icons';
import io from 'socket.io-client';
import useStyles from '../../../hooks/useStyles';

const socket = io.connect('http://localhost:5001');

function MessagingWindow() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id, user_type } = useSelector((store) => store.user);
  const { conversationId } = useSelector((store) => store.messages.windowOpen);
  const messageText = useSelector((store) => store.messages.textInput);
  const {
    clients_name,
    clients_users_id,
    providers_name,
    providers_users_id,
    message_log,
  } = useSelector((store) => store.messages.messagesReducer).find(
    (item) => item.conversation === conversationId
  );

  const handleSendMessage = () => {
    socket.emit('SEND_MESSAGE', {
      sender_users_id: id,
      recipient_users_id:
        user_type === 'client' ? providers_users_id : clients_users_id,
      message: messageText,
      conversation: conversationId,
    });
    dispatch({ type: 'CLEAR_MESSAGE_TEXT' });
  };

  const handleCheckForEnter = (event) => {
    event.shiftKey && event.keyCode === 13
      ? dispatch({ type: 'SET_MESSAGE_TEXT', payload: event.target.value })
      : event.keyCode === 13
      ? handleSendMessage()
      : dispatch({ type: 'SET_MESSAGE_TEXT', payload: event.target.value });
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
            {user_type === 'client' ? providers_name : clients_name}
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
        {message_log?.map((item) => (
          <Box
            key={item.id}
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
      <Divider />
      <Box display="flex" alignItems="center">
        <TextField
          fullWidth
          multiline
          InputProps={{
            classes: {
              input: classes.messageTextField,
            },
          }}
          value={messageText}
          onChange={(event) =>
            dispatch({ type: 'SET_MESSAGE_TEXT', payload: event.target.value })
          }
          onKeyDown={handleCheckForEnter}
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <Send />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default MessagingWindow;
