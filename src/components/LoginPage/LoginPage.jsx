import React, { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Paper, Button, Typography, Grid } from '@material-ui/core';
import useStyles from '../../hooks/useStyles';

function LoginPage() {
  const classes = useStyles();
  const [showSignup, setShowSignup] = useState(true);
  const [loginBtn, setLoginBtn] = useState('outlined');
  const [signupBtn, setSignupBtn] = useState('contained');

  const clickLogin = () => {
    setShowSignup(false);
    setLoginBtn('contained');
    setSignupBtn('outlined');
  }

  const clickSignup = () => {
    setShowSignup(true);
    setLoginBtn('outlined');
    setSignupBtn('contained');
  }

  return (
    <div className={classes.centerContainer}>
      <Paper className={classes.loginContainer}>
        <Grid container align="center" spacing={1}>
          <Grid item xs={6}>
            <Button
              variant={signupBtn}
              color="primary"
              className={classes.loginBtn}
              onClick={clickSignup}
            >
              <Typography>Sign Up</Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant={loginBtn}
              color="primary"
              className={classes.loginBtn}
              onClick={clickLogin}
            >
              <Typography>Login</Typography>
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.loginForm}>
            {showSignup ? <RegisterForm /> : <LoginForm />}
          </Grid>
        </Grid>
      </Paper>

      {/* <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center> */}
    </div>
  );
}

export default LoginPage;
