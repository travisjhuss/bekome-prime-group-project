import { useDispatch } from 'react-redux';
import useStyles from '../../hooks/useStyles';
import { IconButton } from '@material-ui/core';
import { Star, StarOutline } from '@material-ui/icons/';

function FavoriteProviderButton({ id, saved, type }) {
  const dispatch = useDispatch();
  const classes = useStyles();

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
