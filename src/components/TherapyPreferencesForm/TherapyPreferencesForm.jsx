import { useDispatch, useSelector } from 'react-redux';
import { Typography, Chip, TextField, Paper } from '@material-ui/core';

import FormPreferencesChecks from '../FormPreferencesChecks/FormPreferencesChecks';

function TherapyPreferencesForm({ classes }) {
  const dispatch = useDispatch();
  const clientAnswers = useSelector((store) => store.forms.clientAnswers);

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
      <Typography>If so, how was your previous therapy experience?</Typography>
      <TextField
        disabled={!clientAnswers.previous_therapy}
        label="Answer here"
        variant="outlined"
        multiline
        rows={8}
        value={clientAnswers.previous_experience || ''}
        onChange={handleTextInputs('previous_experience')}
      />
      <Typography>What kind of treatments are you interested in?</Typography>
      <FormPreferencesChecks category={'treatments'} limit={3} />
    </Paper>
  );
}

export default TherapyPreferencesForm;
