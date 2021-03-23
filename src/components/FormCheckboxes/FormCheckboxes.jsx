import {
  Checkbox,
  Box,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from '../../hooks/useStyles';

function FormCheckboxes({ category, limit, size }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user_type } = useSelector((store) => store.user);
  const filteredPreferences = useSelector((store) => store.preferences).filter(
    (item) => item.category === category
  );
  const { preferences_array } =
    user_type === 'client'
      ? useSelector((store) => store.forms.clientAnswers)
      : useSelector((store) => store.forms.providerAnswers);

  const showError =
    filteredPreferences.filter((item) => preferences_array?.includes(item.id))
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

  const whatSize =
    size === 'sm' ? 200 : size === 'md' ? 300 : size === 'lg' ? 400 : 500;

  return (
    <FormControl error={showError}>
      {limit && <FormHelperText>Please choose up to {limit}.</FormHelperText>}
      <Box className={classes.checkboxBox} maxHeight={whatSize}>
        {filteredPreferences.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                checked={preferences_array?.includes(item.id)}
                onChange={() => handleCheck(item.id)}
              />
            }
            label={
              user_type === 'client' && item.name === 'Prefer not to respond'
                ? 'No preference'
                : item.name
            }
          />
        ))}
      </Box>
    </FormControl>
  );
}

export default FormCheckboxes;
