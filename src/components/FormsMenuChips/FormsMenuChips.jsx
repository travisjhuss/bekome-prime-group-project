import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Menu, MenuItem, Chip } from '@material-ui/core';

function FormsMenuChips({ category, string }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const preferences = useSelector((store) => store.preferences);
  const answers =
    user.user_type === 'client'
      ? useSelector((store) => store.forms.clientAnswers)
      : useSelector((store) => store.forms.providerAnswers);
  const [anchorEl, setAnchorEl] = useState(null);

  const filteredPreferences = preferences.filter(
    (item) => item.category === category
  );

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
            onClick={
              () =>
                dispatch({
                  type: 'SET_CLIENT_PREFERENCES',
                  payload: item.id,
                }) // needs to be changed for providers
            }
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
              onDelete={() =>
                dispatch({ type: 'SET_CLIENT_PREFERENCES', payload: item.id })
              } // needs to be changed for providers
              color="primary"
            />
          );
        }
      })}
    </>
  );
}

export default FormsMenuChips;
