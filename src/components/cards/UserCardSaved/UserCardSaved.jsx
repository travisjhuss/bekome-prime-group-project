import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from '@material-ui/core';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FavoriteProviderButton from '../../FavoriteProviderButton/FavoriteProviderButton';

function UserCardSaved({ provider }) {
  const {
    providers_users_id,
    pic,
    city,
    state,
    pronouns,
    first_name,
    last_name,
  } = provider;
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const sendToDetails = () => {
    history.push(`/provider-details/${provider.providers_users_id}`);
  };

  return (
    <center>
      <Card className={classes.savedProviderCard}>
        <CardMedia className={classes.cardMedia} image={pic} />
        <CardContent className={classes.cardHeader}>
          <Typography variant="h6" display="inline">
            {first_name + ' ' + last_name}
          </Typography>{' '}
          <FavoriteProviderButton
            id={providers_users_id}
            saved={true}
            type={'GET_SAVED_PROVIDERS'}
          />
          <br />
          <Typography variant="body2">
            {city}, {state}
          </Typography>
          <Typography variant="body2">{pronouns}</Typography>
        </CardContent>
        <CardActions className={classes.cardButton}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={sendToDetails}
          >
            Full Profile
          </Button>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() =>
              dispatch({
                type: 'OPEN_MESSAGE_WINDOW',
                payload: {
                  sentName: first_name,
                  sentPic: pic,
                  sentId: providers_users_id,
                },
              })
            }
          >
            Send Message
          </Button>
        </CardActions>
      </Card>
    </center>
  );
}

export default UserCardSaved;
