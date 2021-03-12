import UserCard from '../UserCard/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

function ExploreView() {
  const dispatch = useDispatch();
  const providers = useSelector((store) => store.exploreReducer);

  // Runs only on page load
  useEffect(() => {
    dispatch({ type: 'GET_PROVIDERS' });
    dispatch({ type: 'FETCH_PROVIDER_QUESTIONS' });
    dispatch({ type: 'FETCH_PREFERENCES' });
  }, []);

  return (
    <div>
      <Grid>
        {providers.map((provider) => {
          return (
            <UserCard key={provider.providers_users_id} provider={provider} />
          );
        })}
      </Grid>
      <p>You made it to Explore View</p>
    </div>
  );
}

export default ExploreView;
