import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Menu, MenuItem, Chip } from '@material-ui/core';

function FormMenuChips({ category, string }) {
  const dispatch = useDispatch();
  const { user_type } = useSelector((store) => store.user);
  const filteredPreferences = useSelector((store) => store.preferences).filter(
    (item) => item.category === category
  );
  const answers =
    user_type === 'client'
      ? useSelector((store) => store.forms.clientAnswers)
      : useSelector((store) => store.forms.providerAnswers);
  const [anchorEl, setAnchorEl] = useState(null);

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
            selected={answers.preferences.indexOf(item.id) > -1}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
      {filteredPreferences.map((item) => {
        if (answers.preferences.indexOf(item.id) > -1) {
          return (
            <Chip
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