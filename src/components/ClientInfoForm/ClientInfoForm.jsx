import { useSelector, useDispatch } from 'react-redux';
import { Paper, Typography, TextField } from '@material-ui/core';

function ClientInfoForm({ classes }) {
  const dispatch = useDispatch();
  const clientAnswers = useSelector((store) => store.forms.clientAnswers);

  const handleTextInputs = (key) => (event) => {
    dispatch({
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: { key, value: event.target.value },
    });
  };

  return (
    <Paper className={classes.paper}>
      <TextField
        variant="outlined"
        label="First Name"
        className={classes.inputs}
        value={clientAnswers.first_name || ''}
        onChange={handleTextInputs('first_name')}
      />
      <TextField
        variant="outlined"
        label="Last Name"
        className={classes.inputs}
        value={clientAnswers.last_name || ''}
        onChange={handleTextInputs('last_name')}
      />
      <TextField
        variant="outlined"
        label="Pronouns"
        className={classes.inputs}
        value={clientAnswers.pronouns || ''}
        onChange={handleTextInputs('pronouns')}
      />
      <TextField
        variant="outlined"
        label="Picture URL"
        className={classes.inputs}
        value={clientAnswers.pic || ''}
        onChange={handleTextInputs('pic')}
      />
      <TextField
        variant="outlined"
        label="Date of Birth"
        className={classes.inputs}
        value={clientAnswers.date_of_birth || ''}
        onChange={handleTextInputs('date_of_birth')}
      />
      <TextField
        variant="outlined"
        label="Location"
        className={classes.inputs}
        value={clientAnswers.location || ''}
        onChange={handleTextInputs('location')}
      />
    </Paper>
  );
}

export default ClientInfoForm;
