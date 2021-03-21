import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Button } from '@material-ui/core';
// Custom hooks
import useStyles from '../../hooks/useStyles';
// Component imports
import FavoriteProviderButton from '../FavoriteProviderButton/FavoriteProviderButton';
import QuestionAccordion from '../accordions/QuestionAccordion/QuestionAccordion';
import StrengthsAccordion from '../accordions/StrengthsAccordion/StrengthsAccordion';
import BackgroundAccordion from '../accordions/BackgroundAccordion/BackgroundAccordion';
import SpecialtiesAccordion from '../accordions/SpecialtiesAccordion/SpecialtiesAccordion';
import FormatsAccordion from '../accordions/FormatsAccordion/FormatsAccordion';

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
    state,
    age,
    saved,
    write_in_pronouns,
    preferences_array,
  } = useSelector((store) => store.providerDetails);
  const preferences = useSelector((store) => store.preferences);
  const { id } = useParams();
  const [openAccordion, setOpenAccordion] = useState('questions');

  useEffect(() => {
    dispatch({ type: 'FETCH_PROVIDER_DETAILS', payload: id });
    dispatch({ type: 'GET_PROVIDERS' });
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

  const handleOpenAccordion = (panel) => (event, isExpanded) => {
    setOpenAccordion(isExpanded ? panel : false);
  };

  return (
    <Box p={2} >
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
              <Typography>
                Pronouns: {parsePreferences('pronouns')}
                {write_in_pronouns && `, ${write_in_pronouns}`}
              </Typography>
              <Typography>
                Location: {city}, {state}
              </Typography>
              <Typography>
                Languages: {parsePreferences('languages')}
              </Typography>
              <Typography>
                Religious Affiliations: {parsePreferences('religions')}
              </Typography>
              <Button
                color="secondary"
                variant="contained"
                onClick={() =>
                  dispatch({
                    type: 'OPEN_MESSAGE_WINDOW',
                    payload: providers_users_id,
                  })
                }
              >
                Send Message
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <QuestionAccordion
            openAccordion={openAccordion}
            handleOpenAccordion={handleOpenAccordion}
          />
          <StrengthsAccordion
            openAccordion={openAccordion}
            handleOpenAccordion={handleOpenAccordion}
            parsePreferences={parsePreferences}
          />
          <BackgroundAccordion
            openAccordion={openAccordion}
            handleOpenAccordion={handleOpenAccordion}
            parsePreferences={parsePreferences}
          />
          <SpecialtiesAccordion
            openAccordion={openAccordion}
            handleOpenAccordion={handleOpenAccordion}
            parsePreferences={parsePreferences}
          />
          <FormatsAccordion
            openAccordion={openAccordion}
            handleOpenAccordion={handleOpenAccordion}
            parsePreferences={parsePreferences}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProviderDetails;
