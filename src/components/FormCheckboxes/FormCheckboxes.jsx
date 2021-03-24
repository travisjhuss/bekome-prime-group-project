import {
  Checkbox,
  Box,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from '../../hooks/useStyles';

// Component imported into various forms throughout the app, shows a filtered
// list of things to choose from in the preferences table, also displays what
// is currently selected for the user in redux
function FormCheckboxes({ category, limit, size }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user_type } = useSelector((store) => store.user);
  const { preferences_array } =
    user_type === 'client'
      ? useSelector((store) => store.forms.clientAnswers)
      : useSelector((store) => store.forms.providerAnswers);
  // Filters to a list of the category of preferences set down from the 
  // parent component via props
  const filteredPreferences = useSelector((store) => store.preferences).filter(
    (item) => item.category === category
  );

  // If a limit is sent down from parent component via props, will turn the 
  // FormHelperText red to denote an error
  const showError =
    filteredPreferences.filter((item) => preferences_array?.includes(item.id))
      .length > limit;

  // Dispatch to toggle a selected checkbox in redux
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

  // If a size is sent down from the parent component via props, it will
  // set the maxHeight of the box of checks here
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
