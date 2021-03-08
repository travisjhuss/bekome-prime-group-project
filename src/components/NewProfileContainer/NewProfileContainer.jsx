import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography, Stepper, Step, StepLabel } from '@material-ui/core';

import ClientInfoForm from '../ClientInfoForm/ClientInfoForm';

const steps = [
  'Client Information',
  'Therapy Preferences',
  'Provider Preferences',
];

function NewProfileContainer() {
  const { page } = useParams();
  const user = useSelector((store) => store.user);

  return (
    <>
      <Box p={3}>
        <Typography>
          Create new {user.user_type == 'client' ? 'Client' : 'Provider'}{' '}
          Profile for {user.email}
        </Typography>
      </Box>
      <Stepper activeStep={Number(page)}>
        {steps.map((item, i) => (
          <Step key={i}>
            <StepLabel>{item}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
}

export default NewProfileContainer;
