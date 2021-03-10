import { useSelector, useDispatch } from 'react-redux';
import { Paper, Typography, TextField } from '@material-ui/core';

// Component imports
import FormCheckboxes from '../FormCheckboxes/FormCheckboxes';

function ClientForm2Reasons({ classes, handleInputs }) {
  const clientAnswers = useSelector((store) => store.forms.clientAnswers);

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
        onChange={handleInputs('primary_reason')}
      />
      <Typography>What are you struggling with?</Typography>
      <FormCheckboxes category={'challenges'} />
    </Paper>
  );
}

export default ClientForm2Reasons;
