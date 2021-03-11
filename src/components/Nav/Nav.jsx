import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Nav.css';
import { useSelector } from 'react-redux';
// MUI
import { Typography, Button } from '@material-ui/core';
import NavAvatar from '../NavAvatar/NavAvatar';
import NavClient from '../NavClient/NavClient';
import NavProvider from '../NavProvider/NavProvider';

function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <div className="nav">
      <Link to="/home">
        <Typography variant="h3" color="primary" display="inline">
          bekome.
        </Typography>{' '}
        {!user.id && (
          <Typography variant="subtitle1" color="primary" display="inline">
            find your <i>right</i> care. bekome your <i>best</i> self
          </Typography>
        )}
      </Link>
      <div>
        {user.id ? (
          user.filled_out_form &&
          (user.user_type === 'client' ? (
            <>
              <NavClient />
              <NavAvatar />
            </>
          ) : (
            <>
              <NavProvider />
              <NavAvatar />
            </>
          ))
        ) : (
          <>
            <Button onClick={() => history.push('/how-it-works')}>
              <Typography variant="subtitle1" color="primary">
                How it Works
              </Typography>
            </Button>
            <Button onClick={() => history.push('/login')}>
              <Typography variant="subtitle1" color="secondary">
                Login / Sign-up
              </Typography>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
