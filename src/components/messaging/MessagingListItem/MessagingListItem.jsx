import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  ListItem,
  Avatar,
  ListItemIcon,
  Typography,
  Divider,
} from '@material-ui/core';
// Custom hooks
import useStyles from '../../../hooks/useStyles';

// This displays a user's messages organized by conversation between
// provider and client
function MessagingListItem({ messageThread, unread }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user_type } = useSelector((store) => store.user);
  const {
    conversation,
    providers_name,
    providers_pic,
    providers_users_id,
    clients_name,
    clients_pic,
    clients_users_id,
    message_log,
  } = messageThread;

  // Triggers opening MessagingWindow and gives it the clicked conversation ID
  const handleClickMessage = () => {
    dispatch({
      type: 'OPEN_MESSAGE_WINDOW',
      payload: {
        conversationId: conversation,
      },
    });
    // Uses the previously found 'unread' status to trigger the message
    // being marked as read, if applicable
    if (unread === true) {
      dispatch({
        type: 'MARK_AS_READ',
        payload: message_log[message_log.length - 1].id,
      });
    }
  };

  return (
    <Box>
      <ListItem
        className={classes.messagingWidgetListItem}
        button
        onClick={handleClickMessage}
      >
        <ListItemIcon>
          <Avatar
            className={classes.messagingListAvatar}
            src={user_type === 'client' ? providers_pic : clients_pic}
          >
            {user_type === 'client'
              ? providers_name.charAt(0)
              : clients_name.charAt(0)}
          </Avatar>
        </ListItemIcon>
        <Box>
          <Box paddingTop={1}>
            <Typography
              variant="body2"
              className={unread && classes.unreadMessageText}
            >
              {user_type === 'client' ? providers_name : clients_name}
            </Typography>
          </Box>
          <Box className={classes.messagePreviewBox} paddingTop={0.5}>
            <Typography
              variant="body2"
              className={unread && classes.unreadMessageText}
            >
              {message_log[message_log.length - 1].message}
            </Typography>
          </Box>
        </Box>
      </ListItem>
      <Divider />
    </Box>
  );
}

export default MessagingListItem;
