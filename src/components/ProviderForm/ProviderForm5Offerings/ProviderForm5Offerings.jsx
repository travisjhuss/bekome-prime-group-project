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
// Components
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

  const handleTravisData = () => {
    dispatch({
      type: 'SET_PROVIDER_PERSONAL_DETAILS',
      payload: { key: 'license_number', value: '219905738MN' },
    });
  };

  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Typography gutterBottom>
            <b>I offer therapy in these formats:</b>
          </Typography>
          <FormCheckboxes category={'formats'} />
          <Box py={2}>
            <Typography onClick={handleTravisData} gutterBottom>
              <b>What is your {state} license number?</b>
            </Typography>
            <TextField
              variant="outlined"
              label="License Number"
              className={classes.inputs}
              value={license_number || ''}
              onChange={handleInputs('license_number')}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            <b>I accept insurance from these companies:</b>
          </Typography>
          <FormCheckboxes category={'insurance'} />
        </Grid>
        <Grid item xs={4}>
          <Typography gutterBottom>
            <b>Please upload a short video to introduce yourself!</b>
          </Typography>
          <S3Uploader picOrVideo="video" />
          <Box pt={2}>
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
            <FormControlLabel
              control={
                <Switch
                  checked={accepting_clients}
                  onChange={() =>
                    handleBooleans('accepting_clients', accepting_clients)
                  }
                />
              }
              label="I'm accepting new clients"
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProviderForm5Offerings;
