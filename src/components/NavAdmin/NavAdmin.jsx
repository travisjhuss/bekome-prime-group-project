import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../Nav/Nav.css';
import { useSelector, useDispatch } from 'react-redux';
// MUI
import { Typography, Button } from '@material-ui/core';

function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/login');
  };

  return (
    <div className="nav">
      <Link to="/home">
        <Typography variant="h3" color="primary" display="inline">
          bekome. Admin
        </Typography>
      </Link>
      <div>
        <Button color="primary" onClick={() => history.push('/admin')}>
            Edit Preferences
        </Button>
        <Button color="primary"  onClick={() => history.push('/admin-questions')}>
            Edit Questions
        </Button>
        <Button color="primary" onClick={() => history.push('/admin-users')}>
            View Users
        </Button>
        <Button color="primary" onClick={logout}>
            Logout
        </Button>
      </div>
    </div>
  );
}

export default Nav;
