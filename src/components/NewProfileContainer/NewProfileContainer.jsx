import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography, Stepper, Step, StepLabel, makeStyles } from '@material-ui/core';

// Component imports
import ClientInfoForm from '../ClientInfoForm/ClientInfoForm';
import ProviderPreferencesForm from '../ProviderPreferencesForm/ProviderPreferencesForm';
import TherapyPreferencesForm from '../TherapyPreferencesForm/TherapyPreferencesForm';

// Strings that display on the stepper
const clientSteps = [
  'Client Information',
  'Therapy Preferences',
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
}));

// Outer container that holds all form components
function NewProfileContainer() {
  const classes = useStyles();
  const { id } = useParams();
  const user = useSelector((store) => store.user);
  const currentPage = Number(id);

  return (
    <>
      <Box p={3}>
        <Typography>
          Create new {user.user_type == 'client' ? 'Client' : 'Provider'}{' '}
          Profile for {user.email}
        </Typography>
      </Box>
      {currentPage === 0 ? (
        <ClientInfoForm classes={classes} />
      ) : currentPage === 1 ? (
        <TherapyPreferencesForm classes={classes} />
      ) : (
        <ProviderPreferencesForm classes={classes} />
      )}
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
