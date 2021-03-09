import {
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormLabel,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

function FormPreferencesChecks({ category }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const preferences = useSelector((store) => store.preferences);
  const answers =
    user.user_type === 'client'
      ? useSelector((store) => store.forms.clientAnswers)
      : useSelector((store) => store.forms.providerAnswers);

  return (
    <Box>
      <FormGroup>
        {preferences.map((item) => {
          if (item.category === category) {
            return (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    checked={answers.preferences.indexOf(item.id) > -1}
                    onChange={() =>
                      dispatch({
                        type: 'SET_CLIENT_PREFERENCES',
                        payload: item.id,
                      })
                    }
                  />
                }
                label={item.name}
              />
            );
          }
        })}
      </FormGroup>
    </Box>
  );
}

export default FormPreferencesChecks;
