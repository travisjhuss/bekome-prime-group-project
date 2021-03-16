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
  
  return (
    <Box p={2}>
      <Typography>Edit Profile</Typography>
      <QuestionAccordion />
      <StrengthsAccordion parsePreferences={parsePreferences} />
      <BackgroundAccordion parsePreferences={parsePreferences} />
      <SpecialtiesAccordion parsePreferences={parsePreferences} />
      <FormatsAccordion parsePreferences={parsePreferences} />
    </Box>
  );
}

export default EditProvider;
