import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Box, Typography, makeStyles, Grid } from '@material-ui/core';

// Component imports
import FavoriteProviderButton from '../FavoriteProviderButton/FavoriteProviderButton';
import QuestionAccordion from '../QuestionAccordion/QuestionAccordion';
import StrengthsAccordion from '../StrengthsAccordion/StrengthsAccordion';
import BackgroundAccordion from '../BackgroundAccordion/BackgroundAccordion';
import SpecialtiesAccordion from '../SpecialtiesAccordion/SpecialtiesAccordion';
import FormatsAccordion from '../FormatsAccordion/FormatsAccordion';

function EditProvider() {
  return <h3>In Edit Provider Profile</h3>;
}

export default EditProvider;
