import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Chip,
  Grid,
} from '@material-ui/core';

function TherapyPreferences({ classes }) {
  const dispatch = useDispatch();
  const clientAnswers = useSelector((store) => store.forms.clientAnswers);

  const handleInputChange = (key) => (event) => {
    dispatch({
      type: 'SET_PERSONAL_DETAILS',
      payload: { key, value: event.target.value },
    });
  };

  const handleBoolean = (boolean) => {
    dispatch({
      type: 'SET_PERSONAL_DETAILS',
      payload: { key: 'previous_therapy', value: boolean },
    });
  };

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Typography>Have you seen a therapist before?</Typography>
          <Chip
            className={classes.chips}
            label="Yes"
            onClick={() => handleBoolean(true)}
            color={clientAnswers.previous_therapy ? 'primary' : 'default'}
          />
          <Chip
            className={classes.chips}
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
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>
            What kind of treatments are you interested in?
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TherapyPreferences;
