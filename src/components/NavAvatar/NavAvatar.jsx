import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core';

// creates and styles a custom Menu
const StyledMenu = withStyles({
  paper: {
    backgroundColor: '#e0fbfc',
    color: '#3D5A80',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    {...props}
  />
));

function NavAvatar() {
  const history = useHistory();
  const dispatch = useDispatch();

  //  anchorEl will determine what the menu attaches itself to
  const [anchorEl, setAnchorEl] = useState(null);

  // openMEnu will set anchorEl to the Nav bar when avatar is clicked
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  // on logout, set anchorEl back to null so it disappears, send dispatch, and go to home page
  const logout = () => {
    setAnchorEl(null);
    dispatch({ type: 'LOGOUT' });
    dispatch({ type: 'CLOSE_MESSAGE_WINDOW' });
    history.push('/login');
  };

  const openEdit = () => {
    setAnchorEl(null);
    history.push('/edit_profile');
  };

  return (
    <>
      <IconButton color="primary" onClick={openMenu}>
        <AccountCircleIcon />
      </IconButton>
      <StyledMenu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={openEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" color="secondary" />
          </ListItemIcon>
          <Typography variant="subtitle1" color="primary">
            Edit Profile
          </Typography>
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" color="secondary" />
          </ListItemIcon>
          <Typography variant="subtitle1" color="primary">
            Logout
          </Typography>
        </MenuItem>
      </StyledMenu>
    </>
  );
}

export default NavAvatar;
