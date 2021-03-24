import { useDispatch } from 'react-redux';
import useStyles from '../../hooks/useStyles';
import { IconButton } from '@material-ui/core';
import { Star, StarOutline } from '@material-ui/icons/';

// Allows a client to favorite/save a provider, used on ProviderCard,
// SavedProviderCard, and ProviderDetails
function FavoriteProviderButton({ id, saved, type }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  // Sends a post/delete to db for entires in 'clients_providers_favs'
  const toggleFavorite = () => {
    const whichType = saved ? 'UNFAVORITE_PROVIDER' : 'FAVORITE_PROVIDER';
    dispatch({ type: whichType, payload: { id, type } });
  };

  return (
    <IconButton
      className={classes.saveButton}
      variant={saved ? 'contained' : 'outlined'}
      color="primary"
      onClick={toggleFavorite}
    >
      {saved ? <Star /> : <StarOutline />}
    </IconButton>
  );
}

export default FavoriteProviderButton;
