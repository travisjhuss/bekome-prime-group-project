import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
} from '@material-ui/core';

// Component imports
import ClientFormRoot from '../ClientForm/ClientFormRoot/ClientFormRoot';
import ProviderFormRoot from '../ProviderForm/ProviderFormRoot/ProviderFormRoot';
import useStyles from '../../hooks/useStyles';
import { ArrowForwardIos, ArrowBackIos } from '@material-ui/icons';

// Strings that display on stepper for Client
const clientSteps = [
  'Information',
  'Reasons',
  'Therapy',
  'Qualities',
  'Preferences',
];

// Strings that display on stepper for Provider
const providerSteps = [
  'Information',
  'Qualities',
  'Treatments',
  'Questions',
  'Offerings',
];

// Outer container that holds all form components
function NewProfileContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { page } = useParams();
  const { user_type } = useSelector((store) => store.user);
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
    if (user_type === 'client') {
      dispatch({ type: 'ADD_NEW_CLIENT', payload: forms.clientAnswers });
      history.push('/explore');
      dispatch({ type: 'CLEAR_CLIENT_ANSWERS' });
    } else {
      dispatch({ type: 'ADD_NEW_PROVIDER', payload: forms.providerAnswers });
      history.push('/interested_clients');
      dispatch({ type: 'CLEAR_PROVIDER_ANSWERS' });
    }
  };

  return (
    <>
      <Box px={3} display="flex" alignItems="center">
        <Typography variant="h5" className={classes.formTitle} color="primary">
          Create new {user_type == 'client' ? 'Client' : 'Provider'} Profile
        </Typography>
        <Box flexGrow={1}>
          <Stepper activeStep={currentPage - 1}>
            {stepArrayToDisplay.map((item, i) => (
              <Step key={i}>
                <StepLabel>
                  <Typography className={classes.stepperText}>
                    {item}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
      {user_type === 'client' ? (
        <ClientFormRoot currentPage={currentPage} handleInputs={handleInputs} />
      ) : (
        <ProviderFormRoot
          currentPage={currentPage}
          handleInputs={handleInputs}
        />
      )}
      <Box display="flex" justifyContent="center">
        <Button
          className={classes.formButton}
          disabled={currentPage === 1}
          onClick={() => history.push(`/new-profile/${currentPage - 1}`)}
          variant="contained"
          color="default"
          startIcon={<ArrowBackIos />}
        >
          Back
        </Button>
        <Button
          className={classes.formButton}
          onClick={handleNextButton}
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIos />}
        >
          {currentPage === stepArrayToDisplay.length ? 'Submit' : 'Next'}
        </Button>
      </Box>
    </>
  );
}

export default NewProfileContainer;
