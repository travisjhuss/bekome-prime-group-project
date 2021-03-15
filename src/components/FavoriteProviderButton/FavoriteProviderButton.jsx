import { useDispatch } from 'react-redux';
import { useState } from 'react';

import {
    Button,
    Typography
} from '@material-ui/core';

function FavoriteProviderButton({providerID, favorited}) {

    const dispatch = useDispatch();

    let [favState, setFavState] = useState(favorited);

    const clickFavorite = (id) => {
        setFavState(true);
        console.log(favState)
        dispatch({
            type: 'FAVORITE_PROVIDER',
            payload: id
        })
    }

    const clickUnfavorite = (id) => {
        setFavState(false);
        console.log(favState)
        dispatch({
            type: 'UNFAVORITE_PROVIDER',
            payload: id
        })
    }

    return (
        <>
            {favState
                ?
            <Button
            variant="contained"
            onClick={() => clickUnfavorite(providerID)}
            >
                UnFavorite
            </Button>
                :
            <Button
            variant="outlined"
            onClick={() => clickFavorite(providerID)}
            >
                Favorite
            </Button>
            }
        </>
    )
}

export default FavoriteProviderButton;
