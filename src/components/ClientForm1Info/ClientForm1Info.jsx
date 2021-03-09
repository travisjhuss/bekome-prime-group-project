import { useSelector, useDispatch } from 'react-redux';
import { Paper, Typography, TextField } from '@material-ui/core';

import FormPreferencesChecks from '../FormPreferencesChecks/FormPreferencesChecks';

function ClientForm1Info({ classes }) {
  const dispatch = useDispatch();
  const clientAnswers = useSelector((store) => store.forms.clientAnswers);

  const handleInputs = (key) => (event) => {
    dispatch({
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: { key, value: event.target.value },
    });
  };

  return (
    <Paper className={classes.paper} elevation={4}>
      <TextField
        variant="outlined"
        label="First Name"
        className={classes.inputs}
        value={clientAnswers.first_name || ''}
        onChange={handleInputs('first_name')}
      />
      <TextField
        variant="outlined"
        label="Last Name"
        className={classes.inputs}
        value={clientAnswers.last_name || ''}
        onChange={handleInputs('last_name')}
      />
      <Typography>What pronouns do you use? (select all that apply)</Typography>
      <FormPreferencesChecks category={'pronouns'} />
      <TextField
        variant="outlined"
        label="Other"
        className={classes.inputs}
        value={clientAnswers.write_in_pronouns || ''}
        onChange={handleInputs('write_in_pronouns')}
      />
      <TextField
        variant="outlined"
        label="Picture URL"
        className={classes.inputs}
        value={clientAnswers.pic || ''}
        onChange={handleInputs('pic')}
      />
      <TextField
        variant="outlined"
        label="Date of Birth"
        className={classes.inputs}
        value={clientAnswers.date_of_birth || ''}
        onChange={handleInputs('date_of_birth')}
      />
      <TextField
        variant="outlined"
        label="Location"
        className={classes.inputs}
        value={clientAnswers.location || ''}
        onChange={handleInputs('location')}
      />
    </Paper>
  );
}

export default ClientForm1Info;
