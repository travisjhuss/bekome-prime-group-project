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

// Strings that display on the stepper
const clientSteps = [
  'Client Information',
  'Reasons for Seeking Therapy',
  'Therapy Preferences',
  'Provider Qualities',
  'Provider Preferences',
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
function NewProfileContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const user = useSelector((store) => store.user);
  const forms = useSelector((store) => store.forms);
  const currentPage = Number(id);

  useEffect(() => dispatch({ type: 'FETCH_PREFERENCES' }), []);

  const handleNextButton = () => {
    currentPage === 4
      ? handleSubmit()
      : history.push(`/new_profile/${currentPage + 1}`);
  };

  const handleSubmit = () => {
    user.user_type === 'client'
      ? dispatch({ type: 'ADD_NEW_CLIENT', payload: forms.clientAnswers })
      : dispatch({ type: 'ADD_NEW_PROVIDER', payload: forms.providerAnswers });
    history.push('/explore');
  };

  return (
    <>
      <Box p={3}>
        <Typography>
          Create new {user.user_type == 'client' ? 'Client' : 'Provider'}
          Profile for {user.email}
        </Typography>
      </Box>
      {currentPage === 0 ? (
        <ClientForm1Info classes={classes} />
      ) : currentPage === 1 ? (
        <ClientForm2Reasons classes={classes} />
      ) : currentPage === 2 ? (
        <ClientForm3TherapyPreferences classes={classes} />
      ) : currentPage === 3 ? (
        <ClientForm4ProviderQualities classes={classes} />
      ) : (
        <ClientForm5ProviderPreferences classes={classes} />
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
        {clientSteps.map((item, i) => (
          <Step key={i}>
            <StepLabel>{item}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
}

export default NewProfileContainer;
