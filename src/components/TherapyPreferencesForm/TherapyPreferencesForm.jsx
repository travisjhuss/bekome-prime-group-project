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

function TherapyPreferences({ classes }) {
  const dispatch = useDispatch();
  const clientAnswers = useSelector((store) => store.forms.clientAnswers);
  const preferences = useSelector((store) => store.preferences);

  const handleTextInputs = (key) => (event) => {
    dispatch({
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: { key, value: event.target.value },
    });
  };

  const handleBoolean = (boolean) => {
    dispatch({
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: { key: 'previous_therapy', value: boolean },
    });
  };

  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Typography>
            What is your primary reason for seeking therapy?
          </Typography>
          <TextField
            variant="outlined"
            label="Answer here"
            multiline
            rows={8}
            className={classes.inputs}
            value={clientAnswers.primary_reason || ''}
            onChange={handleTextInputs('primary_reason')}
          />
          <Typography>What are you struggling with?</Typography>
          <FormPreferencesChips category={'challenges'} />
        </Grid>
        <Grid item xs={6}>
          <Typography>Have you seen a therapist before?</Typography>
          <Chip
            className={classes.chips}
            label="Yes"
            onClick={() => handleBoolean(true)}
            color={clientAnswers.previous_therapy ? 'primary' : 'default'}
          />
          <Chip
            className={classes.chips}
            label="No"
            onClick={() => handleBoolean(false)}
            color={clientAnswers.previous_therapy ? 'default' : 'primary'}
          />
          <Typography>
            If so, how was your previous therapy experience?
          </Typography>
          <TextField
            disabled={!clientAnswers.previous_therapy}
            label="Answer here"
            variant="outlined"
            multiline
            rows={8}
            value={clientAnswers.previous_experience || ''}
            onChange={handleTextInputs('previous_experience')}
          />
          <Typography>
            What kind of treatments are you interested in?
          </Typography>
          <FormPreferencesChips category={'treatments'} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TherapyPreferences;
