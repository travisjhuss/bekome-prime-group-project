import { useSelector } from 'react-redux';
import { Paper, TextField, Typography, Grid, Box } from '@material-ui/core';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';

// Part of provider form stepper, info for strengths, qualities, approach
function ProviderForm2TherapyQualities({ handleInputs }) {
  const classes = useStyles();
  const { approach, strengths } = useSelector(
    (store) => store.forms.providerAnswers
  );

  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Typography gutterBottom>
            <b>My biggest strengths as a therapist are:</b>
          </Typography>
          <FormCheckboxes category={'qualities'} limit={5} size="sm" />
        </Grid>
        <Grid item xs={6}>
          <Box pb={2}>
            <Typography gutterBottom>
              <b>I would describe my approach as:</b>
            </Typography>
            <TextField
              className={classes.inputs}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              label="Answer here..."
              onChange={handleInputs('approach')}
              value={approach}
            />
          </Box>
          <Typography gutterBottom>
            <b>My clients would describe me as:</b>
          </Typography>
          <TextField
            className={classes.inputs}
            variant="outlined"
            multiline
            fullWidth
            rows={4}
            label="Answer here..."
            onChange={handleInputs('strengths')}
            value={strengths}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProviderForm2TherapyQualities;
