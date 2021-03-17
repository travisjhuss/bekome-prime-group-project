import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  Grid,
  Box,
  TextField,
} from '@material-ui/core';

// Component imports
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';
import S3Uploader from '../../S3Uploader/S3Uploader';
import useStyles from '../../../hooks/useStyles';

function ProviderForm5Offerings({ handleInputs }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    accepting_clients,
    sliding_scale,
    license_number,
    state,
  } = useSelector((store) => store.forms.providerAnswers);

  const handleBooleans = (key, boolean) => {
    dispatch({
      type: 'SET_PROVIDER_PERSONAL_DETAILS',
      payload: { key, value: !boolean },
    });
  };

  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography>I offer therapy in these formats:</Typography>
          <FormCheckboxes category={'formats'} />
          <Typography>I accept insurance from these companies:</Typography>
          <FormCheckboxes category={'insurance'} />
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={accepting_clients}
                  onChange={() =>
                    handleBooleans('accepting_clients', accepting_clients)
                  }
                />
              }
              label="I'm currently accepting new clients"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={sliding_scale}
                  onChange={() =>
                    handleBooleans('sliding_scale', sliding_scale)
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
          <Typography>What is your {state} license number?</Typography>
          <TextField
            variant="outlined"
            label="License Number"
            className={classes.inputs}
            value={license_number || ''}
            onChange={handleInputs('license_number')}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProviderForm5Offerings;
