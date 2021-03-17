import { useDispatch, useSelector } from 'react-redux';
import { Typography, Chip, TextField, Paper, Grid } from '@material-ui/core';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';

function ClientForm3TherapyPreferences({ handleInputs }) {
  const classes  = useStyles();
  const dispatch = useDispatch();
  const clientAnswers = useSelector((store) => store.forms.clientAnswers);

  const handleBoolean = (boolean) => {
    dispatch({
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: { key: 'previous_therapy', value: boolean },
    });
  };

  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography>Have you seen a therapist before?</Typography>
          <Chip
            className={classes.chipButtons}
            label="Yes"
            onClick={() => handleBoolean(true)}
            color={clientAnswers.previous_therapy ? 'primary' : 'default'}
          />
          <Chip
            className={classes.chipButtons}
            label="No"
            onClick={() => handleBoolean(false)}
            color={clientAnswers.previous_therapy ? 'default' : 'primary'}
          />
          <Typography>
            If so, how was your previous therapy experience?
          </Typography>
          <TextField
            disabled={!clientAnswers.previous_therapy}
            label="Answer here"
            variant="outlined"
            multiline
            rows={8}
            value={clientAnswers.previous_experience || ''}
            onChange={handleInputs('previous_experience')}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>
            What kind of treatments are you interested in?
          </Typography>
          <FormCheckboxes category={'treatments'} limit={3} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ClientForm3TherapyPreferences;
