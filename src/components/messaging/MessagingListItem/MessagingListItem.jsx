import { useSelector } from 'react-redux';
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

function MessagingListItem({ message, handleClickMessage, setUnread }) {
  const classes = useStyles();
  const { user_type, id } = useSelector((store) => store.user);
  const {
    id: messageId,
    conversation,
    providers_name,
    providers_pic,
    clients_name,
    clients_pic,
    message_log,
    read_by_recipient,
  } = message;

  return (
    <Box key={messageId}>
      <ListItem
        className={classes.messageWidgetListItem}
        button
        onClick={() => handleClickMessage(conversation)}
      >
        <ListItemIcon>
          <Avatar
            className={classes.messageAvatar}
            src={user_type === 'client' ? providers_pic : clients_pic}
          >
            {user_type === 'client'
              ? providers_name.charAt(0)
              : clients_name.charAt(0)}
          </Avatar>
        </ListItemIcon>
        <Box>
          <Typography variant="body2">
            <b>{user_type === 'client' ? providers_name : clients_name}</b>
          </Typography>
          <Typography variant="body2">
            {message_log[message_log.length - 1].message}
          </Typography>
        </Box>
      </ListItem>
      <Divider />
    </Box>
  );
}

export default MessagingListItem;
