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
import ClientForm1Info from '../ClientForm1Info/ClientForm1Info';
import ClientForm2Reasons from '../ClientForm2Reasons/ClientForm2Reasons';
import ClientForm3TherapyPreferences from '../ClientForm3TherapyPreferences/ClientForm3TherapyPreferences';
import ClientForm4ProviderQualities from '../ClientForm4ProviderQualities/ClientForm4ProviderQualities';
import ClientForm5ProviderPreferences from '../ClientForm5ProviderPreferences/ClientForm5ProviderPreferences';
import ProviderForm1Info from '../ProviderForm1Info/ProviderForm1Info';
import ProviderForm2TherapyQualities from '../ProviderForm2TherapyQualities/ProviderForm2TherapyQualities';

// Strings that display on the stepper
const clientSteps = [
  'Information',
  'Reasons',
  'Therapy',
  'Provider Qualities',
  'Provider Preferences',
];

const providerSteps = ['Information', 'Qualities'];

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

const ClientPages = ({ currentPage, classes, handleInputs }) => {
  return (
    <>
      {currentPage === 0 ? (
        <ClientForm1Info classes={classes} handleInputs={handleInputs} />
      ) : currentPage === 1 ? (
        <ClientForm2Reasons classes={classes} handleInputs={handleInputs} />
      ) : currentPage === 2 ? (
        <ClientForm3TherapyPreferences
          classes={classes}
          handleInputs={handleInputs}
        />
      ) : currentPage === 3 ? (
        <ClientForm4ProviderQualities
          classes={classes}
          handleInputs={handleInputs}
        />
      ) : (
        <ClientForm5ProviderPreferences
          classes={classes}
          handleInputs={handleInputs}
        />
      )}
    </>
  );
};

const ProviderPages = ({ currentPage, classes, handleInputs }) => {
  return (
    <>
      {currentPage === 0 ? (
        <ProviderForm1Info classes={classes} handleInputs={handleInputs} />
      ) : (
        <ProviderForm2TherapyQualities
          classes={classes}
          handleInputs={handleInputs}
        />
      )}
    </>
  );
};

// Outer container that holds all form components
function NewProfileContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const { email, user_type } = useSelector((store) => store.user);
  const forms = useSelector((store) => store.forms);
  const currentPage = Number(id);
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
    currentPage === 4
      ? handleSubmit()
      : history.push(`/new_profile/${currentPage + 1}`);
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
        <ClientPages
          currentPage={currentPage}
          classes={classes}
          handleInputs={handleInputs}
        />
      ) : (
        <ProviderPages
          currentPage={currentPage}
          classes={classes}
          handleInputs={handleInputs}
        />
      )}
      <Button
        disabled={currentPage === 0}
        onClick={() => history.push(`/new_profile/${currentPage - 1}`)}
        variant="contained"
        color="default"
      >
        Back
      </Button>
      <Button onClick={handleNextButton} variant="contained" color="primary">
        {currentPage === 4 ? 'Submit' : 'Next'}
      </Button>
      <Stepper activeStep={currentPage}>
        {stepArrayToDisplay.map((item, i) => (
          <Step key={i}>
            <StepLabel>{item}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
}

export default NewProfileContainer;
