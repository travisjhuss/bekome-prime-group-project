import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
} from '@material-ui/core';

// Component imports
import FormCheckboxes from '../FormCheckboxes/FormCheckboxes';

function ProviderForm5Offerings({ classes, handleInputs }) {
  const dispatch = useDispatch();
  const providerAnswers = useSelector((store) => store.forms.providerAnswers);

  const handleBooleans = (key) => {
    dispatch({
      type: 'SET_PROVIDER_PERSONAL_DETAILS',
      payload: { key, value: !providerAnswers[key] },
    });
  };

  return (
    <Paper className={classes.paper} elevation={4}>
      <Typography>I offer therapy in these formats:</Typography>
      <FormCheckboxes category={'formats'} />
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
      <Typography>
        Please upload a short video to introduce yourself!
      </Typography>
      <TextField
        className={classes.inputs}
        variant="outlined"
        label="Video URL"
        value={providerAnswers.video}
        onChange={handleInputs('video')}
      />
    </Paper>
  );
}

export default ProviderForm5Offerings;
