import { Paper, Typography } from '@material-ui/core';

// Component imports
import FormCheckboxes from '../FormCheckboxes/FormCheckboxes';

function ClientForm4ProviderQualities({ classes }) {
  return (
    <Paper className={classes.paper} elevation={4}>
      <Typography>What qualities do you look for in a therapist?</Typography>
      <FormCheckboxes category={'qualities'} limit={5} />
    </Paper>
  );
}

export default ClientForm4ProviderQualities;
