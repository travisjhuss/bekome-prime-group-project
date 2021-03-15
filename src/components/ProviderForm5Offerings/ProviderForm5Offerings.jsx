import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  Grid,
  Box,
} from '@material-ui/core';

// Component imports
import FormCheckboxes from '../FormCheckboxes/FormCheckboxes';
import S3Uploader from '../S3Uploader/S3Uploader';

function ProviderForm5Offerings({ classes, handleInputs }) {
  const dispatch = useDispatch();
  const providerAnswers = useSelector((store) => store.forms.providerAnswers);

  const handleBooleans = (key) => {
    dispatch({
      type: 'SET_PROVIDER_PERSONAL_DETAILS',
      payload: { key, value: !providerAnswers[key] },
    });
  };

  // Client asked for inputs for licensure state and license number

  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography>I offer therapy in these formats:</Typography>
          <FormCheckboxes category={'formats'} />
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={providerAnswers.insurance}
                  onChange={() => handleBooleans('insurance')}
                />
              }
              label="I accept insurance"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={providerAnswers.sliding_scale}
                  onChange={() => handleBooleans('sliding_scale')}
                />
              }
              label="I offer sliding scale payments"
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            Please upload a short video to introduce yourself!
          </Typography>
          <S3Uploader />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProviderForm5Offerings;
