import UserCardSaved from '../UserCardSaved/UserCardSaved';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

<<<<<<< HEAD
function SavedProviders() {
  const dispatch = useDispatch();

  const savedProvidersReducer = useSelector((store) => store.savedProviders);

  // Runs only on page load
  useEffect(() => {
    dispatch({ type: 'GET_SAVED_PROVIDERS' });
  }, []);

  return (
    <div>
      <Grid>
        {savedProvidersReducer.map((provider) => {
          return (
            <UserCardSaved
              key={provider.providers_users_id}
              provider={provider}
              favorited={true}
            />
          );
        })}
      </Grid>
    </div>
  );
=======
const useStyles = makeStyles((theme) => ({
    gridContainer: {
        paddingLeft: "40px",
        paddingRight: "40px"
    }
}));

function SavedProviders () {

    const dispatch = useDispatch();
    const classes = useStyles();

    const savedProvidersReducer = useSelector((store) => store.savedProviders)

    // Runs only on page load
    useEffect(() => {
        dispatch({ type: "GET_SAVED_PROVIDERS" });
    }, []);

    return (
        <div>
            <Grid container className={classes.gridContainer} spacing={3}>
                {savedProvidersReducer.map(provider => {
                    return (
                        <Grid item xs={12} sm={6} md={4} xl={3} lg={4}>
                            <UserCardSaved
                            key = {provider.providers_users_id}
                            provider = {provider}
                            favorited = {true}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
>>>>>>> ee6df5db3656a2ff08f350d98c384a753b3cd2a2
}

export default SavedProviders;
