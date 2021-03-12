import UserCard from '../UserCard/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

function ExploreView() {
  const dispatch = useDispatch();

  const providersReducer = useSelector((store) => store.exploreReducer);
  const questionsReducer = useSelector((store) => store.providerQuestions);

  // Runs only on page load
  useEffect(() => {
    dispatch({ type: 'GET_PROVIDERS' });
    dispatch({ type: 'FETCH_PROVIDER_QUESTIONS' });
  }, []);

  return (
    <center>
      <Grid container spacing={2}>
        {providersReducer.map((provider) => {
          return (
            <Grid item xs={4}>
              <UserCard
                key={provider.providers_users_id}
                provider={provider}
                questions={questionsReducer}
                favorited={false}
              />
            </Grid>
          );
        })}
      </Grid>
    </center>
  );
}

export default ExploreView;
