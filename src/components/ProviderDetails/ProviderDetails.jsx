import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  Paper,
  Box,
  Accordion,
  Typography,
  makeStyles,
  Grid,
} from '@material-ui/core';
import { DateTime } from 'luxon';

// Component imports
import FavoriteProviderButton from '../FavoriteProviderButton/FavoriteProviderButton';
import QuestionAccordion from '../QuestionAccordion/QuestionAccordion';

const useStyles = makeStyles((theme) => ({
  pic: {
    width: 200,
    height: 200,
    objectFit: 'cover',
    padding: theme.spacing(3),
  },
}));

function ProviderDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    first_name,
    last_name,
    pic,
    video,
    location,
    background,
    strengths,
    approach,
    insurance,
    sliding_scale,
    date_of_birth,
    preferences_array,
  } = useSelector((store) => store.providerDetails);
  const preferences = useSelector((store) => store.preferences);
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_PROVIDER_DETAILS', payload: id });
    dispatch({ type: 'FETCH_PREFERENCES' });
  }, []);

  const providersPreferences = preferences.filter(
    (item) => preferences_array?.indexOf(item.id) > -1
  );

  const age = DateTime.now()
    .diff(DateTime.fromISO(date_of_birth))
    .toFormat('y');

  console.log(providersPreferences);

  return (
    <Box p={2}>
      <Box display="flex" alignItems="center">
        <Typography>
          {first_name} {last_name}
        </Typography>
        <FavoriteProviderButton providers_users_id={id} />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Box display="flex">
            <Paper elevation={4}>
              <img src={pic} className={classes.pic} />
            </Paper>
            <Box>
              <Typography>Age: {age}</Typography>
              <Typography>Languages:</Typography>
              {providersPreferences.map((item) => {
                if (item.category === 'languages') {
                  return <Typography key={item.id}>{item.name}</Typography>;
                }
              })}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <QuestionAccordion />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProviderDetails;
