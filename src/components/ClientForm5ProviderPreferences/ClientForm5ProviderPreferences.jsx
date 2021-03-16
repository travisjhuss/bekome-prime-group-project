import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Paper,
  Switch,
  FormControlLabel,
  Grid,
} from '@material-ui/core';

import FormCheckboxes from '../FormCheckboxes/FormCheckboxes';
import FormMenuChips from '../FormMenuChips/FormMenuChips';

function ClientForm5ProviderPreferences({ classes }) {
  const dispatch = useDispatch();
  const clientAnswers = useSelector((store) => store.forms.clientAnswers);
  const insurance = useSelector((store) => store.preferences).find(
    (item) => item.name === 'Insurance'
  );
  const slidingScale = useSelector((store) => store.preferences).find(
    (item) => item.name === 'Sliding Scale'
  );

  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography>My ideal therapist would be:</Typography>
          <FormCheckboxes category={'genders'} />
          <FormCheckboxes category={'sexual_orientations'} />
          <FormCheckboxes category={'ethnicities'} />
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={6}>
            <Typography>My therapist should speak:</Typography>
            <FormMenuChips category={'languages'} string={'Languages'} />
            <Typography>My therapist's ideal religion would be:</Typography>
            <FormMenuChips category={'religions'} string={'Religions'} />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={clientAnswers.preferences.includes(slidingScale?.id)}
                  onChange={() =>
                    dispatch({
                      type: 'SET_CLIENT_PREFERENCES',
                      payload: slidingScale.id,
                    })
                  }
                />
              }
              label="I would like to see someone with sliding scale payments"
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ClientForm5ProviderPreferences;
