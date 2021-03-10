import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { SearchIcon, StarOutlineIcon, AccountCircleIcon, ExitToAppIcon, EditIcon, } from '@material-ui/icons';
import { Typography, Button, Menu, MenuItem, AppBar} from '@material-ui/core'

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Sign-up',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <Typography variant="h3" color="primary">bekome.</Typography>
      </Link>
      <div>
        {user.id ? (
          <>
            <Link className="navLink" to="/info">
              Explore Providers
            </Link>
            <Link className="navLink" to="/info">
              Saved Providers
            </Link>
            {/* profile avatar */}
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
