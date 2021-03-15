import { useSelector } from 'react-redux';
import { Paper, TextField, Typography } from '@material-ui/core';

// Component imports
import FormPreferencesChecks from '../FormCheckboxes/FormCheckboxes';
import FormMenuChips from '../FormMenuChips/FormMenuChips';

// This form needs a lot more work! Also, need a gender checkbox!!
function ProviderForm1Info({ classes, handleInputs }) {
  const providerAnswers = useSelector((store) => store.forms.providerAnswers);

  return (
    <Paper className={classes.paper} elevation={4}>
      <TextField
        variant="outlined"
        label="First Name"
        className={classes.inputs}
        value={providerAnswers.first_name || ''}
        onChange={handleInputs('first_name')}
      />
      <TextField
        variant="outlined"
        label="Last Name"
        className={classes.inputs}
        value={providerAnswers.last_name || ''}
        onChange={handleInputs('last_name')}
      />
      <Typography>What pronouns do you use? (select all that apply)</Typography>
      <FormPreferencesChecks category={'pronouns'} />
      <TextField
        variant="outlined"
        label="Other"
        className={classes.inputs}
        value={providerAnswers.write_in_pronouns || ''}
        onChange={handleInputs('write_in_pronouns')}
      />
      <TextField
        variant="outlined"
        label="Picture URL"
        className={classes.inputs}
        value={providerAnswers.pic || ''}
        onChange={handleInputs('pic')}
      />
      <TextField
        variant="outlined"
        label="Date of Birth"
        className={classes.inputs}
        value={providerAnswers.date_of_birth || ''}
        onChange={handleInputs('date_of_birth')}
      />
      <TextField
        variant="outlined"
        label="Location"
        className={classes.inputs}
        value={providerAnswers.location || ''}
        onChange={handleInputs('location')}
      />
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
