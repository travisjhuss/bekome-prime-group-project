import { useSelector, useDispatch } from 'react-redux';
import { Typography, Paper, Switch, FormControlLabel } from '@material-ui/core';

import FormPreferencesChecks from '../FormPreferencesChecks/FormPreferencesChecks';
import FormMenuChips from '../FormMenuChips/FormMenuChips';

function ClientForm5ProviderPreferences({ classes }) {
  const dispatch = useDispatch();
  const clientAnswers = useSelector((store) => store.forms.clientAnswers);

  return (
    <Paper className={classes.paper} elevation={4}>
      <Typography>I want a therapist that:</Typography>
      <FormControlLabel
        control={
          <Switch
            checked={clientAnswers.insurance}
            onChange={() =>
              dispatch({
                type: 'SET_INSURANCE_SLIDING_SCALE',
                payload: 'insurance',
              })
            }
          />
        }
        label="Accepts insurance"
      />
      <FormControlLabel
        control={
          <Switch
            checked={clientAnswers.sliding_scale}
            onChange={() =>
              dispatch({
                type: 'SET_INSURANCE_SLIDING_SCALE',
                payload: 'sliding_scale',
              })
            }
          />
        }
        label="Has sliding scale payments"
      />
      <Typography>My ideal therapist would be:</Typography>
      <FormPreferencesChecks category={'genders'} />
      <FormPreferencesChecks category={'sexual_orientations'} />
      <FormPreferencesChecks category={'ethnicities'} />
      <Typography>My therapist should speak:</Typography>
      <FormMenuChips category={'languages'} string={'Languages'} />
      <Typography>My therapist's ideal religion would be:</Typography>
      <FormMenuChips category={'religions'} string={'Religions'} />
    </Paper>
  );
}

export default ClientForm5ProviderPreferences;
