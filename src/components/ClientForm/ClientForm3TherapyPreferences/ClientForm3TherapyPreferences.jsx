import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Chip,
  TextField,
  Paper,
  Grid,
  Box,
} from '@material-ui/core';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';

function ClientForm3TherapyPreferences({ handleInputs }) {
  const classes = useStyles();
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
        <Grid item xs={4}>
          <Typography gutterBottom>
            <b>Have you seen a therapist before?</b>
          </Typography>
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
          <Box pt={2}>
            <Typography>
              <b>If so, how was your previous therapy experience?</b>
            </Typography>
            <TextField
              disabled={!clientAnswers.previous_therapy}
              label="Answer here"
              variant="outlined"
              multiline
              fullWidth
              rows={12}
              value={clientAnswers.previous_experience || ''}
              onChange={handleInputs('previous_experience')}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            <b>What kind of treatments are you interested in?</b>
          </Typography>
          <FormCheckboxes category={'treatments'} limit={3} />
        </Grid>
        <Grid item xs={4}>
          <Typography>
            <b>What qualities do you look for in a therapist?</b>
          </Typography>
          <FormCheckboxes category={'qualities'} limit={5} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ClientForm3TherapyPreferences;
