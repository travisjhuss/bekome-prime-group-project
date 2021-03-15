import { useDispatch } from 'react-redux';
import { useState } from 'react';
import useStyles from '../../hooks/useStyles';
import { IconButton, Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

function FavoriteProviderButton({ providerID }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  let [favState, setFavState] = useState(false);

  const clickFavorite = (id) => {
    setFavState(true);
    console.log(favState);
    dispatch({
      type: 'FAVORITE_PROVIDER',
      payload: id,
    });
  };

  const clickUnfavorite = (id) => {
    setFavState(false);
    console.log(favState);
    dispatch({
      type: 'UNFAVORITE_PROVIDER',
      payload: id,
    });
  };

  return (
    <>
      {favState ? (
        <IconButton
          className={classes.saveButton}
          variant="contained"
          color="primary"
          onClick={() => clickUnfavorite(providerID)}
        >
          <StarIcon />
        </IconButton>
      ) : (
        <IconButton
          className={classes.saveButton}
          variant="outlined"
          color="primary"
          onClick={() => clickFavorite(providerID)}
        >
          <StarOutlineIcon />
        </IconButton>
      )}
    </>
  );
}

export default FavoriteProviderButton;
