import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import {
  TextField,
  Box,
  Typography,
  IconButton,
  Paper,
  Divider,
  Avatar,
} from '@material-ui/core';
import { Close, Send } from '@material-ui/icons';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Socket.io connection
const socket = io.connect('http://localhost:5001');

// Shows the array of messages each conversation contains, and the TextField
// to send a new message
function MessagingWindow() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id, user_type } = useSelector((store) => store.user);
  const { sentName, sentPic, sentId, conversationId } = useSelector(
    (store) => store.messages.windowOpen
  ).messageData;
  const messageText = useSelector((store) => store.messages.textInput);
  
  // Finds a previous message thread between these two users, if it exists,
  // based on the conversation id, which is a combo of the two id numbers 
  // separated by '_', i.e. '2_6'
  const messageThread = useSelector(
    (store) => store.messages.messagesReducer
  ).find(
    (item) =>
      item.conversation === conversationId ||
      item.conversation === `${id}_${sentId}` ||
      item.conversation === `${sentId}_${id}`
  );

  // Finds who the user is based on their user type.
  // Or, if this is a new message without a thread, it will assign the values
  // to what was sent via redux from hitting a 'Send Message' button
  // NOTE: this is based only on provider/client messaging at the moment
  const notTheUser = messageThread
    ? user_type === 'client'
      ? {
          name: messageThread.providers_name,
          pic: messageThread.providers_pic,
          id: messageThread.providers_users_id,
        }
      : {
          name: messageThread.clients_name,
          pic: messageThread.clients_pic,
          id: messageThread.clients_users_id,
        }
    : { name: sentName, pic: sentPic, id: sentId };

  // useRef makes sure the message window starts at the bottom/most recent text,
  // along with the following useEffect() and scrollToBottom() functions
  const messagesBottomRef = useRef(null);

  useEffect(() => scrollToBottom(), []);

  const scrollToBottom = () => {
    messagesBottomRef.current?.scrollIntoView();
  };

  // Sends message through socket.io, which triggers a POST to the db
  // Either sends the existing conversation id, or a new one
  const handleSendMessage = () => {
    socket.emit('SEND_MESSAGE', {
      sender_users_id: id,
      recipient_users_id: notTheUser.id,
      message: messageText,
      conversation: messageThread?.conversation || `${id}_${sentId}`,
    });
    // Clears the stored message data in redux
    dispatch({ type: 'CLEAR_MESSAGE_TEXT' });
  };

  // Allows the user to press the 'enter' key to send, and 'shift + enter'
  // to type on a new line
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
        <Box display="flex" alignItems="center">
          <Avatar
            className={classes.messagingWindowAvatar}
            src={notTheUser.pic}
          >
            {notTheUser.name.charAt(0)}
          </Avatar>
          <Typography variant="body2">
            <b>Conversation with {notTheUser.name}</b>
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={() => dispatch({ type: 'CLOSE_MESSAGE_WINDOW' })}
        >
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <Box className={classes.messagingBody}>
        {messageThread?.message_log.map((item) => (
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
        <div ref={messagesBottomRef}></div>
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
