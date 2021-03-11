import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Paper, Box, Typography, makeStyles, Grid } from '@material-ui/core';
import { DateTime } from 'luxon';

// Component imports
import FavoriteProviderButton from '../FavoriteProviderButton/FavoriteProviderButton';
import QuestionAccordion from '../QuestionAccordion/QuestionAccordion';
import StrengthsAccordion from '../StrengthsAccordion/StrengthsAccordion';
import BackgroundAccordion from '../BackgroundAccordion/BackgroundAccordion';
import SpecialtiesAccordion from '../SpecialtiesAccordion/SpecialtiesAccordion';
import FormatsAccordion from '../FormatsAccordion/FormatsAccordion';

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

  const parseString = (category) => {
    return preferences
      .filter(
        (item) =>
          item.category === category && preferences_array?.indexOf(item.id) > -1
      )
      .reduce((string, item) => (string += `${item.name}, `), '')
      .slice(0, -2);
  };

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
        <Grid item xs={6}>
          <Box display="flex">
            <Paper elevation={4}>
              <img src={pic} className={classes.pic} />
            </Paper>
            <Box>
              <Typography>Age: {age}</Typography>
              <Typography>Languages: {parseString('languages')}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <QuestionAccordion parseString={parseString} />
          <StrengthsAccordion parseString={parseString} />
          <BackgroundAccordion parseString={parseString} />
          <SpecialtiesAccordion parseString={parseString} />
          <FormatsAccordion parseString={parseString} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProviderDetails;
