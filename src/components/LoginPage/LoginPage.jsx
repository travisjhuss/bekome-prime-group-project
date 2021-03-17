import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Paper, Button, Typography, Grid } from '@material-ui/core';
import useStyles from '../../hooks/useStyles';

function LoginPage() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.centerContainer}>
      <Paper className={classes.loginContainer}>
        <Grid container align="center" spacing={1}>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" className={classes.loginBtn}>
              <Typography>Sign Up</Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" className={classes.loginBtn}>
              <Typography>Login</Typography>
            </Button>
          </Grid>
        </Grid>
        <LoginForm />
      </Paper>

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
