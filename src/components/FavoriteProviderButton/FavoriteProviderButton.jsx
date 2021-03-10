import { useDispatch } from 'react-redux';

import {
    Button,
    Typography
} from '@material-ui/core';

function FavoriteProviderButton({providerID}) {

    const dispatch = useDispatch();

    const clickFavorite = (id) => {
        dispatch({
            type: 'FAVORITE_PROVIDER',
            payload: id
        })
    }

    return (
        <Button
        variant="outlined"
        onClick={() => clickFavorite(providerID)}
        >
            Fav
        </Button>
    )
}

export default FavoriteProviderButton;