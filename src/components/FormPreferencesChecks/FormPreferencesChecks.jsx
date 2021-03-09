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
  const user = useSelector((store) => store.user);
  const preferences = useSelector((store) => store.preferences);
  const answers =
    user.user_type === 'client'
      ? useSelector((store) => store.forms.clientAnswers)
      : useSelector((store) => store.forms.providerAnswers);

  const filteredPreferences = preferences.filter(
    (item) => item.category === category
  );

  const showError =
    filteredPreferences.filter(
      (item) => answers.preferences.indexOf(item.id) > -1
    ).length > limit;

  return (
    <FormControl error={showError}>
      {limit && <FormHelperText>Please choose up to {limit}.</FormHelperText>}
      <FormGroup>
        {filteredPreferences.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                checked={answers.preferences.indexOf(item.id) > -1}
                onChange={() =>
                  dispatch({
                    type: 'SET_CLIENT_PREFERENCES', // this needs to be changed for providers
                    payload: item.id,
                  })
                }
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
