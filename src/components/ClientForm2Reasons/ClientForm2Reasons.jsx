import { useSelector } from 'react-redux';
import { Paper, Typography, TextField, Grid } from '@material-ui/core';

// Component imports
import FormCheckboxes from '../FormCheckboxes/FormCheckboxes';

function ClientForm2Reasons({ classes, handleInputs }) {
  const clientAnswers = useSelector((store) => store.forms.clientAnswers);

  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography>
            What is your primary reason for seeking therapy?
          </Typography>
          <TextField
            variant="outlined"
            label="Answer here"
            multiline
            fullWidth
            rows={4}
            className={classes.inputs}
            value={clientAnswers.primary_reason || ''}
            onChange={handleInputs('primary_reason')}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>What are you struggling with?</Typography>
          <FormCheckboxes category={'challenges'} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ClientForm2Reasons;
