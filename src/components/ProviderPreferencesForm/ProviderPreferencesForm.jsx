import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  Typography,
  TextField,
  Chip,
  Grid,
  Box,
} from '@material-ui/core';

// Component imports
import FormPreferencesChips from '../FormPreferencesChecks/FormPreferencesChecks';

function ProviderPreferencesForm({ classes }) {
  const dispatch = useDispatch();
  const clientAnswers = useSelector((store) => store.forms.clientAnswers);

  return (
    <Paper className={classes.paper} elevation={4}>
      <Typography>What qualities do you look for in a therapist?</Typography>
      <FormPreferencesChips
        category={'qualities'}
        label={'select all that apply'}
      />
    </Paper>
  );
}

export default ProviderPreferencesForm;
