import { useSelector, useDispatch } from 'react-redux';
import { Paper, TextField, Typography, Grid, Box } from '@material-ui/core';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';

function ProviderForm3Treatments({ handleInputs }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const providerAnswers = useSelector((store) => store.forms.providerAnswers);

  const handleTravisData = () => {
    dispatch({
      type: 'SET_PROVIDER_PERSONAL_DETAILS',
      payload: {
        key: 'background',
        value: `I went to school at the University of Wisconsin, Madison, and traveled the world for a few years before starting my own practice in St. Paul, MN, which I've had for over ten years.`,
      },
    });
  };

  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography onClick={handleTravisData} gutterBottom>
            <b>A little about my background:</b>
          </Typography>
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
