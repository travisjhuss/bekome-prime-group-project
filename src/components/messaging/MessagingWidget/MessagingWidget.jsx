import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Avatar,
  withStyles,
  Badge,
  Collapse,
  List,
} from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import MessagingListItem from '../MessagingListItem/MessagingListItem';
// Socket connection
const socket = io.connect('http://localhost:5001');

// Badge component which is added to user's Avatar if they have unread messages
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#EE6C4D',
    color: '#EE6C4D',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '1px solid currentColor',
      content: '""',
    },
  },
}))(Badge);

// This is a constant bar on the screen in all views, displaying messages the
// user has received, and notifying them when new messages are received
function MessagingWidget() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { first_name, pic, id } = useSelector((store) => store.user);
  // Message threads, sorted by date so the most current is first
  const messages = useSelector((store) => store.messages.messagesReducer).sort(
    (a, b) => {
      return (
        new Date(b.message_log[b.message_log.length - 1].timestamp) -
        new Date(a.message_log[a.message_log.length - 1].timestamp)
      );
    }
  );
  const [collapse, setCollapse] = useState(false);

  useEffect(() => dispatch({ type: 'FETCH_MESSAGES' }), []);

  // Checks to see if there are unread messages in the user's list
  const checkForBadge = messages.findIndex((item) => {
    const { recipient_users_id, read_by_recipient } = item.message_log[
      item.message_log.length - 1
    ];
    return recipient_users_id === id && read_by_recipient === false;
  });

  // When socket.io sends a 'RECEIVE_MESSAGE', this triggers a GET route
  // to retrieve messages from the db
  socket.on('RECEIVE_MESSAGE', () => {
    dispatch({ type: 'FETCH_MESSAGES' });
  });

  // Called in the props sent to MessagingListItem, checks to see if user is the
  // recipient of the last message in its message_log array and if it's unread
  const checkForUnread = (message_log) => {
    const { recipient_users_id, read_by_recipient } = message_log[
      message_log.length - 1
    ];
    if (recipient_users_id === id && read_by_recipient === false) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Paper className={classes.messageBar} elevation={4}>
      <Box
        display="flex"
        alignItems="center"
        onClick={() => setCollapse(!collapse)}
      >
        {checkForBadge > -1 ? (
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
            <Avatar className={classes.messagingWidgetAvatar} src={pic}>
              {first_name && first_name.charAt(0)}
            </Avatar>
          </StyledBadge>
        ) : (
          <Avatar className={classes.messagingWidgetAvatar} src={pic}>
            {first_name && first_name.charAt(0)}
          </Avatar>
        )}
        <Box flexGrow={1} px={2}>
          <Typography variant="body2">
            <b>Messages</b>
          </Typography>
        </Box>
        <IconButton size="small" onClick={() => setCollapse(!collapse)}>
          {collapse ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={collapse}>
        {messages[0] ? (
          <List>
            {messages.map((messageThread, i) => (
              <MessagingListItem
                key={i}
                messageThread={messageThread}
                unread={checkForUnread(messageThread.message_log)}
              />
            ))}
          </List>
        ) : (
          <Box p={2}>
            <Typography variant="body2" align="center">
              <i>You don't have any messages.</i>
            </Typography>
          </Box>
        )}
      </Collapse>
    </Paper>
  );
}

export default MessagingWidget;
