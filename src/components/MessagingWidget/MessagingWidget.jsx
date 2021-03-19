import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
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
  Divider,
  List,
  ListItem,
  ListItemIcon,
} from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
// Custom hooks
import useStyles from '../../hooks/useStyles';
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
  const { first_name, pic } = useSelector((store) => store.user);
  const messages = useSelector((store) => store.messages.messagesReducer);
  const [collapse, setCollapse] = useState(false);
  const unread = messages.findIndex((item) => item.read === false) > -1;
  const groupedMessages = [];
  for (let message of messages) {

  }

  useEffect(() => dispatch({ type: 'FETCH_MESSAGES' }), []);

  socket.on('RECEIVE_MESSAGE', () => {
    dispatch({ type: 'FETCH_MESSAGES' });
  });

  const handleClickMessage = (senders_users_id, read, id) => {
    dispatch({
      type: 'OPEN_MESSAGE_WINDOW',
      payload: senders_users_id,
    });
    
    if (read === false) {
      dispatch({ type: 'MARK_AS_READ', payload: id });
    }
  };

  return (
    <Paper className={classes.messageBar} elevation={4}>
      <Box
        display="flex"
        alignItems="center"
        onClick={() => setCollapse(!collapse)}
      >
        {unread ? (
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
            <Avatar className={classes.messageAvatar} src={pic}>
              {first_name && first_name.charAt(0)}
            </Avatar>
          </StyledBadge>
        ) : (
          <Avatar className={classes.messageAvatar} src={pic}>
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
        <List>
          {messages.map((item) => {
            return (
              <Box key={item.id}>
                <ListItem
                  button
                  onClick={() =>
                    handleClickMessage(
                      item.senders_users_id,
                      item.read,
                      item.id
                    )
                  }
                >
                  <ListItemIcon>
                    <Avatar
                      className={classes.messageAvatar}
                      src={item.sender_pic}
                    >
                      {item.sender_name && item.sender_name.charAt(0)}
                    </Avatar>
                  </ListItemIcon>
                  <Typography variant="body2">
                    <b>{item.sender_name}</b> {item.message}
                  </Typography>
                </ListItem>
                <Divider />
              </Box>
            );
          })}
        </List>
      </Collapse>
    </Paper>
  );
}

export default MessagingWidget;
