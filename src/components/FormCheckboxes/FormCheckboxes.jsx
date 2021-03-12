import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

function FormPreferencesChecks({ category, limit }) {
  const dispatch = useDispatch();
  const { user_type } = useSelector((store) => store.user);
  const filteredPreferences = useSelector((store) => store.preferences).filter(
    (item) => item.category === category
  );
  const answers =
    user_type === 'client'
      ? useSelector((store) => store.forms.clientAnswers)
      : useSelector((store) => store.forms.providerAnswers);

  const showError =
    filteredPreferences.filter((item) => answers.preferences?.includes(item.id))
      .length > limit;

  const handleCheck = (id) => {
    const whichType =
      user_type === 'client'
        ? 'SET_CLIENT_PREFERENCES'
        : 'SET_PROVIDER_PREFERENCES';
    dispatch({
      type: whichType,
      payload: id,
    });
  };

  return (
    <FormControl error={showError}>
      {limit && <FormHelperText>Please choose up to {limit}.</FormHelperText>}
      <FormGroup>
        {filteredPreferences.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                checked={answers.preferences.includes(item.id)}
                onChange={() => handleCheck(item.id)}
              />
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default FormPreferencesChecks;
