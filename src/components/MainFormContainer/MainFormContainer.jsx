import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  makeStyles,
  Button,
} from '@material-ui/core';

// Component imports
import ClientFormRoot from '../ClientFormRoot/ClientFormRoot';
import ProviderFormRoot from '../ProviderFormRoot/ProviderFormRoot';

// Strings that display on stepper for Client
const clientSteps = [
  'Information',
  'Reasons',
  'Therapy',
  'Provider Qualities',
  'Provider Preferences',
];

// Strings that display on stepper for Provider
const providerSteps = [
  'Information',
  'Qualities',
  'Treatments',
  'Questions',
  'Offerings',
];

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4),
    padding: theme.spacing(3),
  },
  inputs: {
    margin: theme.spacing(2),
  },
  chips: {
    width: '12ch',
    margin: theme.spacing(0.5),
  },
}));

// Outer container that holds all form components
function MainFormContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { page } = useParams();
  const { email, user_type } = useSelector((store) => store.user);
  const forms = useSelector((store) => store.forms);
  const currentPage = Number(page);
  const stepArrayToDisplay =
    user_type === 'client' ? clientSteps : providerSteps;

  useEffect(() => dispatch({ type: 'FETCH_PREFERENCES' }), []);

  const handleInputs = (key) => (event) => {
    const whichType =
      user_type === 'client'
        ? 'SET_CLIENT_PERSONAL_DETAILS'
        : 'SET_PROVIDER_PERSONAL_DETAILS';
    dispatch({
      type: whichType,
      payload: { key, value: event.target.value },
    });
  };

  const handleNextButton = () => {
    currentPage === stepArrayToDisplay.length
      ? handleSubmit()
      : history.push(`/new-profile/${currentPage + 1}`);
  };

  const handleSubmit = () => {
    user_type === 'client'
      ? dispatch({ type: 'ADD_NEW_CLIENT', payload: forms.clientAnswers })
      : dispatch({ type: 'ADD_NEW_PROVIDER', payload: forms.providerAnswers });
    history.push('/explore');
  };

  return (
    <>
      <Box p={3}>
        <Typography>
          Create new {user_type == 'client' ? 'Client' : 'Provider'}
          Profile for {email}
        </Typography>
      </Box>
      {user_type === 'client' ? (
        <ClientFormRoot
          currentPage={currentPage}
          classes={classes}
          handleInputs={handleInputs}
        />
      ) : (
        <ProviderFormRoot
          currentPage={currentPage}
          classes={classes}
          handleInputs={handleInputs}
        />
      )}
      <Button
        disabled={currentPage === 1}
        onClick={() => history.push(`/new-profile/${currentPage - 1}`)}
        variant="contained"
        color="default"
      >
        Back
      </Button>
      <Button onClick={handleNextButton} variant="contained" color="primary">
        {currentPage === stepArrayToDisplay.length ? 'Submit' : 'Next'}
      </Button>
      <Stepper activeStep={currentPage - 1}>
        {stepArrayToDisplay.map((item, i) => (
          <Step key={i}>
            <StepLabel>{item}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
}

export default MainFormContainer;
