import { useSelector } from 'react-redux';
import { Paper, TextField, Typography, Grid } from '@material-ui/core';

// Component imports
import FormCheckboxes from '../FormCheckboxes/FormCheckboxes';

function ProviderForm3Treatments({ classes, handleInputs }) {
  const providerAnswers = useSelector((store) => store.forms.providerAnswers);
  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography>A little about my background:</Typography>
          <TextField
            className={classes.inputs}
            variant="outlined"
            multiline
            fullWidth
            rows={6}
            label="Answer here"
            value={providerAnswers.background}
            onChange={handleInputs('background')}
          />
          <Typography>I'm trained in these treatments:</Typography>
          <FormCheckboxes category={'treatments'} />
        </Grid>
        <Grid item xs={6}>
          <Typography>
            The challenges I most often help people with are:
          </Typography>
          <FormCheckboxes category={'challenges'} limit={5} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProviderForm3Treatments;
