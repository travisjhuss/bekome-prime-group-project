import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';

// Component imports
import FormPreferencesChips from '../FormPreferencesChecks/FormPreferencesChecks';

function ClientInfoForm({ classes }) {
  const dispatch = useDispatch();
  const clientAnswers = useSelector((store) => store.forms.clientAnswers);
  const sexualOrientations = useSelector((store) => store.preferences).filter(
    (item) => item.category === 'sexual_orientations'
  );

  const handleInputs = (key) => (event) => {
    dispatch({
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: { key, value: event.target.value },
    });
  };

  return (
    <Paper className={classes.paper} elevation={4}>
      <TextField
        variant="outlined"
        label="First Name"
        className={classes.inputs}
        value={clientAnswers.first_name || ''}
        onChange={handleInputs('first_name')}
      />
      <TextField
        variant="outlined"
        label="Last Name"
        className={classes.inputs}
        value={clientAnswers.last_name || ''}
        onChange={handleInputs('last_name')}
      />
      <TextField
        variant="outlined"
        label="Pronouns"
        className={classes.inputs}
        value={clientAnswers.pronouns || ''}
        onChange={handleInputs('pronouns')}
      />
      <TextField
        variant="outlined"
        label="Picture URL"
        className={classes.inputs}
        value={clientAnswers.pic || ''}
        onChange={handleInputs('pic')}
      />
      <Typography>Gender: (select all that apply)</Typography>
      <FormPreferencesChips category={'genders'} />
      <Typography>Sexual Orientation:</Typography>
      <FormControl>
        <RadioGroup
          value={clientAnswers.sexual_orientation}
          onChange={handleInputs('sexual_orientation')}
        >
          {sexualOrientations.map((item) => (
            <FormControlLabel
              key={item.id}
              value={item.id}
              control={
                <Radio checked={clientAnswers.sexual_orientation == item.id} />
              }
              label={item.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <TextField
        variant="outlined"
        label="Date of Birth"
        className={classes.inputs}
        value={clientAnswers.date_of_birth || ''}
        onChange={handleInputs('date_of_birth')}
      />
      <TextField
        variant="outlined"
        label="Location"
        className={classes.inputs}
        value={clientAnswers.location || ''}
        onChange={handleInputs('location')}
      />
    </Paper>
  );
}

export default ClientInfoForm;
