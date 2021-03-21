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

function MessagingWidget() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { first_name, pic, id } = useSelector((store) => store.user);
  const messages = useSelector((store) => store.messages.messagesReducer);
  const [collapse, setCollapse] = useState(false);

  useEffect(() => dispatch({ type: 'FETCH_MESSAGES' }), []);

  const checkForBadge = messages.findIndex((item) => {
    const { recipient_users_id, read_by_recipient } = item.message_log[
      item.message_log.length - 1
    ];
    return recipient_users_id === id && read_by_recipient === false;
  });

  socket.on('RECEIVE_MESSAGE', () => {
    dispatch({ type: 'FETCH_MESSAGES' });
  });

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
            {messages.map((message) => (
              <MessagingListItem
                key={message.id}
                message={message}
                unread={checkForUnread(message.message_log)}
              />
            ))}
          </List>
        ) : (
          <Box p={2}>
            <Typography variant="body2" align="center">
              You don't have any messages.
            </Typography>
          </Box>
        )}
      </Collapse>
    </Paper>
  );
}

export default MessagingWidget;
