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
import useStyles from '../../hooks/useStyles';

function ClientForm5ProviderPreferences() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { sliding_scale } = useSelector((store) => store.forms.clientAnswers);

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
                  checked={sliding_scale}
                  onChange={() =>
                    dispatch({
                      type: 'SET_CLIENT_PERSONAL_DETAILS',
                      payload: { key: 'sliding_scale', value: !sliding_scale },
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
