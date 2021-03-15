import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { Button, Typography } from '@material-ui/core';

function FavoriteProviderButton({ providerID }) {
  const dispatch = useDispatch();

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
        <Button variant="contained" onClick={() => clickUnfavorite(providerID)}>
          Fav
        </Button>
      ) : (
        <Button variant="outlined" onClick={() => clickFavorite(providerID)}>
          Fav
        </Button>
      )}
    </>
  );
}

export default FavoriteProviderButton;
