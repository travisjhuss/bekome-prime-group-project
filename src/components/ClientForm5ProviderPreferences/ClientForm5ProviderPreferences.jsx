import { useSelector, useDispatch } from 'react-redux';
import { Typography, Paper, Switch, FormControlLabel } from '@material-ui/core';

import FormCheckboxes from '../FormCheckboxes/FormCheckboxes';
import FormMenuChips from '../FormMenuChips/FormMenuChips';

function ClientForm5ProviderPreferences({ classes }) {
  const dispatch = useDispatch();
  const clientAnswers = useSelector((store) => store.forms.clientAnswers);

  const handleBooleans = (key) => {
    dispatch({
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: { key, value: !clientAnswers[key] },
    });
  };

  return (
    <Paper className={classes.paper} elevation={4}>
      <Typography>I want a therapist that:</Typography>
      <FormControlLabel
        control={
          <Switch
            checked={clientAnswers.insurance}
            onChange={() => handleBooleans('insurance')}
          />
        }
        label="I'm open to see someone who doesn't accept my insurance."
      />
      <FormControlLabel
        control={
          <Switch
            checked={clientAnswers.sliding_scale}
            onChange={() => handleBooleans('sliding_scale')}
          />
        }
        label="I would like to see someone with sliding scale payments"
      />
      <Typography>My ideal therapist would be:</Typography>
      <FormCheckboxes category={'genders'} />
      <FormCheckboxes category={'sexual_orientations'} />
      <FormCheckboxes category={'ethnicities'} />
      <Typography>My therapist should speak:</Typography>
      <FormMenuChips category={'languages'} string={'Languages'} />
      <Typography>My therapist's ideal religion would be:</Typography>
      <FormMenuChips category={'religions'} string={'Religions'} />
    </Paper>
  );
}

export default ClientForm5ProviderPreferences;
