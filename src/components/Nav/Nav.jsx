import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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

  const openEdit = () => {
    setAnchorEl(null);
    history.push('/edit_profile');
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
              <MenuItem 
                onClick={openEdit}
              >
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
            <Button
              onClick={() => history.push('/how-it-works')}
            >
              <Typography color="primary">How it Works</Typography>
            </Button>
            <Button
              onClick={() => history.push('/login')}
            >
              <Typography color="primary">Login / Sign-up</Typography>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
