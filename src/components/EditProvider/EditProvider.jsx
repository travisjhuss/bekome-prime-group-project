import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Grid } from '@material-ui/core';

// Component imports
import QuestionAccordion from '../QuestionAccordion/QuestionAccordion';
import StrengthsAccordion from '../StrengthsAccordion/StrengthsAccordion';
import BackgroundAccordion from '../BackgroundAccordion/BackgroundAccordion';
import SpecialtiesAccordion from '../SpecialtiesAccordion/SpecialtiesAccordion';
import FormatsAccordion from '../FormatsAccordion/FormatsAccordion';
import UserCard from '../UserCard/UserCard';
import useStyles from '../../hooks/useStyles';

function EditProvider() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useSelector((store) => store.user);
  const provider = useSelector((store) => store.providerDetails);
  const preferences = useSelector((store) => store.preferences);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROVIDER_DETAILS', payload: id });
    dispatch({ type: 'FETCH_EDIT_PROVIDER_PROFILE', payload: id });
    dispatch({ type: 'FETCH_PREFERENCES' });
  }, []);

  const parsePreferences = (category) => {
    return preferences
      .filter((item) => {
        return (
          item.category === category &&
          provider.preferences_array?.includes(item.id)
        );
      })
      .reduce((string, item) => (string += `${item.name}, `), '')
      .slice(0, -2);
  };

  return (
    <Box p={2}>
      <Typography>Edit Profile</Typography>
      <Grid container>
        <Grid item xs={4}>
          <UserCard provider={provider} />
        </Grid>
        <Grid item xs={8}>
          <QuestionAccordion edit={true} />
          <StrengthsAccordion parsePreferences={parsePreferences} edit={true} />
          <BackgroundAccordion
            parsePreferences={parsePreferences}
            edit={true}
          />
          <SpecialtiesAccordion
            parsePreferences={parsePreferences}
            edit={true}
          />
          <FormatsAccordion parsePreferences={parsePreferences} edit={true} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditProvider;
