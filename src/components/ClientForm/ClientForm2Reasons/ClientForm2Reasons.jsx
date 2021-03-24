import { useSelector } from 'react-redux';
import { Paper, Typography, TextField, Grid } from '@material-ui/core';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';

// Part of new client form stepper, reasons for seeking therapy
function ClientForm2Reasons({ handleInputs }) {
  const classes = useStyles();
  const { primary_reason } = useSelector((store) => store.forms.clientAnswers);

  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography onClick={handleConnorData} gutterBottom>
            <b>What is your primary reason for seeking therapy?</b>
          </Typography>
          <TextField
            variant="outlined"
            label="Answer here"
            multiline
            fullWidth
            rows={8}
            className={classes.inputs}
            value={primary_reason || ''}
            onChange={handleInputs('primary_reason')}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <b>What are you struggling with?</b>
          </Typography>
          <FormCheckboxes category={'challenges'} size="lg" />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ClientForm2Reasons;
