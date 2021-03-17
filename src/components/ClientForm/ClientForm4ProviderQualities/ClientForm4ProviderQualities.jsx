import { Paper, Typography } from '@material-ui/core';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';

function ClientForm4ProviderQualities() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={4}>
      <Typography>What qualities do you look for in a therapist?</Typography>
      <FormCheckboxes category={'qualities'} limit={5} />
    </Paper>
  );
}

export default ClientForm4ProviderQualities;
