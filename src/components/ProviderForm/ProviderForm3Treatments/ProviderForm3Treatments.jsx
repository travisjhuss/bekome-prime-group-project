import { useSelector } from 'react-redux';
import { Paper, TextField, Typography, Grid, Box } from '@material-ui/core';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';

// Part of provider form stepper, lists treatments, background, challenges they
// help clients with
function ProviderForm3Treatments({ handleInputs }) {
  const classes = useStyles();
  const { background } = useSelector((store) => store.forms.providerAnswers);

  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography gutterBottom>
            <b>A little about my background:</b>
          </Typography>
          <TextField
            className={classes.inputs}
            variant="outlined"
            multiline
            fullWidth
            rows={6}
            label="Answer here"
            value={background}
            onChange={handleInputs('background')}
          />
          <Box pt={2}>
            <Typography gutterBottom>
              <b>I'm trained in these treatments:</b>
            </Typography>
            <FormCheckboxes category={'treatments'} size="sm" />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>
            <b>The challenges I most often help people with are:</b>
          </Typography>
          <FormCheckboxes category={'challenges'} limit={5} size="lg" />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProviderForm3Treatments;
