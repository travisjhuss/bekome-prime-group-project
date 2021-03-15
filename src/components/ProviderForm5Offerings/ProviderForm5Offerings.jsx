import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  Grid,
  Box,
} from '@material-ui/core';

// Component imports
import FormCheckboxes from '../FormCheckboxes/FormCheckboxes';
import S3Uploader from '../S3Uploader/S3Uploader';

function ProviderForm5Offerings({ classes }) {
  const dispatch = useDispatch();
  const providerAnswers = useSelector((store) => store.forms.providerAnswers);
  const insurance = useSelector((store) => store.preferences).find(
    (item) => item.name === 'Insurance'
  );
  const slidingScale = useSelector((store) => store.preferences).find(
    (item) => item.name === 'Sliding Scale'
  );

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
                  checked={providerAnswers.preferences.includes(insurance?.id)}
                  onChange={() =>
                    dispatch({
                      type: 'SET_PROVIDER_PREFERENCES',
                      payload: insurance.id,
                    })
                  }
                />
              }
              label="I accept insurance"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={providerAnswers.preferences.includes(
                    slidingScale?.id
                  )}
                  onChange={() =>
                    dispatch({
                      type: 'SET_PROVIDER_PREFERENCES',
                      payload: slidingScale.id,
                    })
                  }
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
