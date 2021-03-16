import { useSelector } from 'react-redux';
import {
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

// Component imports
import FormPreferencesChecks from '../FormCheckboxes/FormCheckboxes';
import FormMenuChips from '../FormMenuChips/FormMenuChips';
import S3Uploader from '../S3Uploader/S3Uploader';
import useStyles from '../../hooks/useStyles';

function ProviderForm1Info({ handleInputs }) {
  const classes = useStyles();
  const {
    first_name,
    last_name,
    write_in_pronouns,
    date_of_birth,
    city,
    state_id,
  } = useSelector((store) => store.forms.providerAnswers);
  const states = useSelector((store) => store.preferences).filter(
    (item) => item.category === 'states'
  );

  return (
    <Paper className={classes.paper} elevation={4}>
      <TextField
        variant="outlined"
        label="First Name"
        className={classes.inputs}
        value={first_name || ''}
        onChange={handleInputs('first_name')}
      />
      <TextField
        variant="outlined"
        label="Last Name"
        className={classes.inputs}
        value={last_name || ''}
        onChange={handleInputs('last_name')}
      />
      <Typography>What pronouns do you use? (select all that apply)</Typography>
      <FormPreferencesChecks category={'pronouns'} />
      <Typography>
        What best describes your gender? (select all that apply)
      </Typography>
      <FormPreferencesChecks category={'genders'} />
      <TextField
        variant="outlined"
        label="Other"
        className={classes.inputs}
        value={write_in_pronouns || ''}
        onChange={handleInputs('write_in_pronouns')}
      />
      <Typography>Upload a Photo:</Typography>
      <S3Uploader />
      <TextField
        type="date"
        variant="outlined"
        label="Date of Birth"
        className={classes.inputs}
        value={date_of_birth}
        onChange={handleInputs('date_of_birth') || ''}
        InputLabelProps={{ shrink: true }}
      />
      <Typography>Where is your practice located?</Typography>
      <TextField
        variant="outlined"
        label="City"
        className={classes.inputs}
        value={city || ''}
        onChange={handleInputs('city')}
      />
      <FormControl variant="outlined">
        <InputLabel id="state-picker">State</InputLabel>
        <Select
          className={classes.stateSelect}
          label="State"
          value={state_id || ''}
          onChange={handleInputs('state_id')}
        >
          {states.map((state) => {
            return <MenuItem value={state.id}>{state.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <Typography>What best describes your race?</Typography>
      <FormPreferencesChecks category={'ethnicities'} />
      <Typography>What languages do you speak?</Typography>
      <FormMenuChips category={'languages'} string={'Languages'} />
      <Typography>What best describes your religion?</Typography>
      <FormMenuChips category={'religions'} string={'Religions'} />
    </Paper>
  );
}

export default ProviderForm1Info;
