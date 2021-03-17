import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FavoriteProviderButton from '../FavoriteProviderButton/FavoriteProviderButton';
import useStyles from '../../hooks/useStyles';
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




function ClientCard({client}) {

  const classes = useStyles();
    const {first_name, last_name, pic, primary_reason, city, state, preferences_array} = client;
    return (
      <Card className={classes.cardRoot}>
      <CardContent className={classes.cardHeader}>
    <img src={pic} />
 
    <Typography>{first_name}</Typography>
    
    <Typography>{last_name}</Typography>

    <Typography>{city}</Typography>

    <Typography>{state}</Typography>

    <Typography>Reason for care: {primary_reason}</Typography>

    <Typography>{preferences_array}</Typography>
    
    </CardContent>
    </Card>
    )
  }

  export default ClientCard;