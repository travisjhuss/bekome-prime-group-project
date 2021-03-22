import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  Box,
} from '@material-ui/core';
import { LocationOn, Language, Edit } from '@material-ui/icons';
// Custom hooks
import useStyles from '../../../hooks/useStyles';

function ClientCard({ client, edit, setCardDialogOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    clients_users_id,
    first_name,
    last_name,
    city,
    state,
    write_in_pronouns,
    pic,
    preferences_array,
    primary_reason,
  } = client;
  const preferences = useSelector((store) => store.preferences);

  const parsePreferences = (category) => {
    return preferences
      .filter((item) => {
        return (
          item.category === category && preferences_array?.includes(item.id)
        );
      })
      .reduce((string, item) => (string += `${item.name}, `), '')
      .slice(0, -2);
  };

  return (
    <Card className={classes.cardRoot}>
      <CardHeader
        className={classes.clientHeader}
        title={
          <Typography variant="h6" color="primary">
            {first_name} {last_name}
          </Typography>
        }
        subheader={
          <>
            {parsePreferences('pronouns')}
            {write_in_pronouns && `, ${write_in_pronouns}`}
          </>
        }
        action={
          edit && (
            <IconButton onClick={() => setCardDialogOpen(true)}>
              <Edit />
            </IconButton>
          )
        }
      />
      <CardMedia className={classes.cardMedia} image={pic} />
      <CardContent className={classes.clientContent}>
        <Box display="flex" alignItems="center">
          <LocationOn className={classes.userCardIcons} color="primary" />
          <Typography variant="body2">
            {city}, {state}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" pt={0.5}>
          <Language className={classes.userCardIcons} color="primary" />
          <Typography variant="body2">
            {parsePreferences('languages')}
          </Typography>
        </Box>
        <br />
        <Typography variant="body2">
          <b>Primary reason for seeking therapy:</b>
        </Typography>
        <Typography variant="body2">{primary_reason}</Typography>
        <Typography variant="body2">
          <b>I'm struggling with:</b>
        </Typography>
        <Typography variant="body2">
          {parsePreferences('challenges')}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardButton}>
        {!edit && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() =>
              dispatch({
                type: 'OPEN_MESSAGE_WINDOW',
                payload: {
                  sentName: first_name,
                  sentPic: pic,
                  sentId: clients_users_id,
                },
              })
            }
          >
            Send Message
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default ClientCard;
