import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
// MUI
import SearchIcon from '@material-ui/icons/Search';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import {
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  AppBar,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();

  let loginLinkData = {
    path: '/login',
    text: 'Login / Sign-up',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setAnchorEl(null);
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <div className="nav">
      <Link to="/home">
        <Typography variant="h3" color="primary">
          bekome.
        </Typography>
      </Link>
      <div>
        {user.id ? (
          <>
            <Button
              startIcon={<SearchIcon />}
              onClick={() => history.push('/explore')}
            >
              <Typography color="primary">Explore Providers</Typography>
            </Button>
            <Button
              startIcon={<StarOutlineIcon />}
              onClick={() => history.push('/about')}
            >
              <Typography color="primary">Saved Providers</Typography>
            </Button>
            <IconButton color="primary" onClick={openMenu}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={closeMenu}
              style={{ marginTop: '10px' }}
            >
              <MenuItem onClick={closeMenu}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
              </MenuItem>
              <MenuItem
                onClick={logout}
              >
                <ListItemIcon>
                  <ExitToAppIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout"/>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Link className="navLink" to="/about">
              How it Works
            </Link>
            <Link className="navLink" to={loginLinkData.path}>
              {loginLinkData.text}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
