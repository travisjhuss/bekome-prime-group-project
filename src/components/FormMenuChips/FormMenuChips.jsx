import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Menu, MenuItem, Chip } from '@material-ui/core';
// Custom hooks
import useStyles from '../../hooks/useStyles';

// Component that is imported on several forms throughout the app, displays
// a pop-up menu of items from the preferences table, and will display a 
// row of chips denoting what is selected
function FormMenuChips({ category, string }) {
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
  const [anchorEl, setAnchorEl] = useState(null);

  // Toggles the items being added to the user's preferences_array
  const handleChange = (id) => {
    const whichType =
      user_type === 'client'
        ? 'SET_CLIENT_PREFERENCES'
        : 'SET_PROVIDER_PREFERENCES';
    dispatch({ type: whichType, payload: id });
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        {string}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {filteredPreferences.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => handleChange(item.id)}
            selected={preferences_array?.includes(item.id)}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
      {filteredPreferences.map((item) => {
        if (preferences_array?.includes(item.id)) {
          return (
            <Chip
              className={classes.chips}
              key={item.id}
              label={item.name}
              onDelete={() => handleChange(item.id)}
              color="primary"
            />
          );
        }
      })}
    </>
  );
}

export default FormMenuChips;
