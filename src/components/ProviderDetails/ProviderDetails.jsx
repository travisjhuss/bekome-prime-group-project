import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Box, Typography, Grid } from '@material-ui/core';

// Component imports
import FavoriteProviderButton from '../FavoriteProviderButton/FavoriteProviderButton';
import QuestionAccordion from '../QuestionAccordion/QuestionAccordion';
import StrengthsAccordion from '../StrengthsAccordion/StrengthsAccordion';
import BackgroundAccordion from '../BackgroundAccordion/BackgroundAccordion';
import SpecialtiesAccordion from '../SpecialtiesAccordion/SpecialtiesAccordion';
import FormatsAccordion from '../FormatsAccordion/FormatsAccordion';
import useStyles from '../../hooks/useStyles';

function ProviderDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    providers_users_id,
    first_name,
    last_name,
    pic,
    video,
    city,
    state_id,
    age,
    saved,
    write_in_pronouns,
    preferences_array,
  } = useSelector((store) => store.providerDetails);
  const preferences = useSelector((store) => store.preferences);
  const { id } = useParams();
  const providerState = preferences.find((item) => item.id === state_id)?.name;

  useEffect(() => {
    dispatch({ type: 'FETCH_PROVIDER_DETAILS', payload: id });
    dispatch({ type: 'FETCH_PREFERENCES' });
  }, []);

  const parsePreferences = (category) => {
    return preferences
      .filter((item) => {
        return (
          item.category === category && preferences_array?.includes(item.id)
        );
      })
      .reduce((string, item) => (string += `${item.name}, `), '')
      .slice(0, -2);
  };

  return (
    <Box p={2}>
      <Box display="flex" alignItems="center">
        <Typography>
          {first_name} {last_name}
        </Typography>
        <FavoriteProviderButton
          id={providers_users_id}
          saved={saved}
          type={'FETCH_PROVIDER_DETAILS'}
        />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Box display="flex">
            <img src={pic} className={classes.pic} />
            <Box>
              <Typography>Age: {age}</Typography>
              <Typography>Languages: {parseString('languages')}</Typography>
              
              
              <Typography>Pronouns:</Typography>
              {providersPreferences.map((item) => {
                if (item.category === "pronouns") {
                  return <Typography key={item.id}>{item.name}</Typography>;
                } 
              })}
              <Typography>Languages:</Typography>
              {providersPreferences.map((item) => {
                if (item.category === "languages") {
                  return <Typography key={item.id}>{item.name}</Typography>;
                }
              })}

<Typography>Religious Affiliations:</Typography>
              {providersPreferences.map((item) => {
                if (item.category === "religions") {
                  return <Typography key={item.id}>{item.name}</Typography>;
                }
              })}
              
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <QuestionAccordion />
          <StrengthsAccordion parsePreferences={parsePreferences} />
          <BackgroundAccordion parsePreferences={parsePreferences} />
          <SpecialtiesAccordion parsePreferences={parsePreferences} />
          <FormatsAccordion parsePreferences={parsePreferences} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProviderDetails;
