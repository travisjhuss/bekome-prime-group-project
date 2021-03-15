import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import Grid from '@material-ui/core/Grid';

// Component imports
import FilterMenu from '../FilterMenu/FilterMenu';
import UserCard from '../UserCard/UserCard';

function ExploreView() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const providers = useSelector((store) => store.exploreReducer);

  // Runs only on page load
  useEffect(() => {
    dispatch({ type: 'GET_PROVIDERS' });
    dispatch({ type: 'FETCH_PROVIDER_QUESTIONS' });
    dispatch({ type: 'FETCH_PREFERENCES' });
  }, []);

  const filterArray = queryString.parse(location.search, {
    arrayFormat: 'bracket',
    parseNumbers: true,
  }).filters;

  const handleFilterURL = (id) => {
    let newFilterString = '';
    if (filterArray && filterArray.includes(id)) {
      const newArray = filterArray.filter((item) => item !== id);
      newFilterString = queryString.stringify(
        { filters: newArray },
        { arrayFormat: 'bracket' }
      );
    } else {
      newFilterString = queryString.stringify(
        { filters: filterArray ? [...filterArray, id] : [id] },
        { arrayFormat: 'bracket' }
      );
    }
    history.push(`/explore/?${newFilterString}`);
  };

  console.log(filterArray);

  const filteredProvidersList = providers.filter((item) => {
    if (filterArray) {
      console.log(item.preferences_array);
      const matches = item.preferences_array.filter((element) =>
        filterArray.includes(element)
      );
      console.log('matches:', matches);
      return matches.length === filterArray.length ? true : false;
    } else {
      return true;
    }
  });

  return (
    <div>
      <FilterMenu handleFilterURL={handleFilterURL} filterArray={filterArray} />
      <Grid>
        {filteredProvidersList.map((provider) => (
          <UserCard key={provider.providers_users_id} provider={provider} />
        ))}
      </Grid>
      <p>You made it to Explore View</p>
    </div>
  );
}

export default ExploreView;
