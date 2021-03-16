import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Box, Typography, makeStyles, Grid } from '@material-ui/core';

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
  const providerAnswers = useSelector((store) => store.forms.providerAnswers);
  const preferences = useSelector((store) => store.preferences);

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
      <Typography>Edit Profile</Typography>
      <QuestionAccordion edit={true} />
      <StrengthsAccordion parsePreferences={parsePreferences} edit={true} />
      <BackgroundAccordion parsePreferences={parsePreferences} edit={true} />
      <SpecialtiesAccordion parsePreferences={parsePreferences} edit={true} />
      <FormatsAccordion parsePreferences={parsePreferences} edit={true} />
    </Box>
  );
}

export default EditProvider;
