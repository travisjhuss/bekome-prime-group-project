import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FavoriteProviderButton from '../FavoriteProviderButton/FavoriteProviderButton';
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

import useStyles from '../../hooks/useStyles';


function UserCardSaved({ provider, favorited }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const sendToDetails = () => {
    history.push(`/provider-details/${provider.providers_users_id}`);
  };

  return (
    <center>
      <Card className={classes.savedProviderCard}>
        <CardMedia className={classes.cardMedia} image={provider.pic}/>
        <CardContent className={classes.cardHeader}>
          <Typography variant="h6" display="inline">
            {provider.first_name + ' ' + provider.last_name}
          </Typography>{' '}
          <FavoriteProviderButton

            providerID = {provider.providers_users_id}
            favorited = {favorited}
          />
          <br/>


          <Typography variant="body2">
              {provider.location}
          </Typography>

          <Typography variant="body2">{provider.pronouns}</Typography>


        </CardContent>
        <CardActions className={classes.cardButton}>
          <Button variant="contained" size="small" color="primary" onClick={sendToDetails}>
            Full Profile
          </Button>
        </CardActions>
      </Card>
    </center>
  );
}

export default UserCardSaved;
