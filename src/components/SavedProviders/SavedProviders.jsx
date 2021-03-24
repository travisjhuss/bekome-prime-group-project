import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Grid, Box } from '@material-ui/core/';
// Components
import ProviderCardSaved from '../cards/ProviderCardSaved/ProviderCardSaved';

// Shows all the providers that a client has saved, on card with reduced info
function SavedProviders() {
  const dispatch = useDispatch();
  const savedProvidersReducer = useSelector((store) => store.savedProviders);

  useEffect(() => dispatch({ type: 'GET_SAVED_PROVIDERS' }), []);

  return (
    <Box p={5}>
      <Grid container spacing={3}>
        {savedProvidersReducer.map((provider) => {
          return (
            <Grid item xs={12} sm={6} md={4} xl={3} lg={4}>
              <ProviderCardSaved
                key={provider.providers_users_id}
                provider={provider}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default SavedProviders;
