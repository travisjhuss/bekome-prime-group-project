import UserCard from '../UserCard/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ScrollMenu from 'react-horizontal-scrolling-menu';

function ExploreView() {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const providersReducer = useSelector((store) => store.exploreReducer);
  const questionsReducer = useSelector((store) => store.providerQuestions);

  // Runs only on page load
  useEffect(() => {
    dispatch({ type: 'GET_PROVIDERS' });
    dispatch({ type: 'FETCH_PROVIDER_QUESTIONS' });
  }, []);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  console.log(ref);
  return (

      <Grid container spacing={2}>
        <Grid item xs={1}>
          <button onClick={() => scroll(-600)}>LEFT</button>
        </Grid>
        <Grid item xs={10}>
          <div ref={ref} className="menu-wrapper">
            {providersReducer.map((provider) => {
              return (
                <UserCard
                  key={provider.providers_users_id}
                  provider={provider}
                  questions={questionsReducer}
                  favorited={false}
                />
              );
            })}
          </div>
        </Grid>
        <Grid item xs={1}>
          <button onClick={() => scroll(600)}>Right</button>
        </Grid>
      </Grid>
  );
}

export default ExploreView;
