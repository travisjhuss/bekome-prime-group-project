import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Button, Typography, Grid, TextField } from '@material-ui/core';
import useStyles from '../../hooks/useStyles';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const classes = useStyles();

  // function that handles logging in or sending proper error
  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form onSubmit={login}>
      <Grid container spacing={5} justify="center">
        <Grid item xs={12}>
          <Typography>Email Address:</Typography>
          <TextField
            className={classes.loginTextField}
            color="secondary"
            variant="outlined"
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>Password:</Typography>
          <TextField
            className={classes.loginTextField}
            color="secondary"
            variant="outlined"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.submitBtn}
            color="secondary"
            variant="contained"
            type="submit"
            name="submit"
            value="Log In"
          >
            Submit
          </Button>
        </Grid>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
      </Grid>
    </form>
  );
}

export default LoginForm;
