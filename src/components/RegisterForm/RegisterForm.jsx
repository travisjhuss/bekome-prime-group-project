import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Chip,
  Typography,
  Button,
  Grid,
  TextField
} from '@material-ui/core';
import useStyles from '../../hooks/useStyles';

function RegisterForm() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
  const [type, setType] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  // function that will register a user after checking to make sure that 
  // both password inputs match
  const registerUser = (event) => {
    event.preventDefault();
    if (password === password2) {
      setPasswordsDoNotMatch(false);
      dispatch({
        type: 'REGISTER',
        payload: { username: email, password, user_type: type },
      });
      history.push('/new-profile/1');
    } else {
      setPasswordsDoNotMatch(true);
    }
  };

  return (
    <form onSubmit={registerUser}>
      <Grid container spacing={1} justify="center">
        <Grid item xs={12}>
          <Typography>Email Address:</Typography>
          <TextField
            className={classes.loginTextField}
            color="secondary"
            variant="outlined"
            type="text"
            name="username"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>Create Password:</Typography>
          <TextField
            className={classes.loginTextField}
            color="secondary"
            variant="outlined"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>Confirm Password:</Typography>
          <TextField
            className={classes.loginTextField}
            color="secondary"
            variant="outlined"
            type="password"
            name="password2"
            value={password2}
            required
            onChange={(event) => setPassword2(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Chip
              className={classes.chipsSignup}
              onClick={() => setType('client')}
              label="I am a client."
              variant={type === 'client' ? 'default' : 'outlined'}
              color="primary"
            />
            <Chip
              className={classes.chipsSignup}
              onClick={() => setType('provider')}
              label="I am a provider."
              variant={type === 'provider' ? 'default' : 'outlined'}
              color="primary"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <input type="checkbox" id="terms" name="terms" required />
          <label for="terms">
            {' '}
            <Typography variant="caption">I agree to the <u>Terms of Use</u> & <u>Privacy Policy</u></Typography>
          </label>
        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.submitBtn}
            color="secondary"
            variant="contained"
            type="submit"
            name="submit"
            value="Register"
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={12}>
        {passwordsDoNotMatch && (
          <h3 className="alert" role="alert">
            Passwords Do Not Match
          </h3>
        )}
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        </Grid>
      </Grid>
    </form>
  );
}

export default RegisterForm;
