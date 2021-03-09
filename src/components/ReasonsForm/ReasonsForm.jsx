import { useSelector, useDispatch } from 'react-redux';
import { Paper, Typography, TextField } from '@material-ui/core';

// Component imports
import FormPreferencesChecks from '../FormPreferencesChecks/FormPreferencesChecks';

function TherapyPreferences({ classes }) {
  const dispatch = useDispatch();
  const clientAnswers = useSelector((store) => store.forms.clientAnswers);

  const handleTextInputs = (key) => (event) => {
    dispatch({
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: { key, value: event.target.value },
    });
  };

  return (
    <Paper className={classes.paper} elevation={4}>
      <Typography>What is your primary reason for seeking therapy?</Typography>
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
      <FormPreferencesChecks category={'challenges'} />
    </Paper>
  );
}

export default TherapyPreferences;
