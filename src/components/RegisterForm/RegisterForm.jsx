import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Chip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  chips: {
    width: '18ch',
    margin: theme.spacing(0.5),
  },
}));

function RegisterForm() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();
    dispatch({
      type: 'REGISTER',
      payload: { username: email, password, user_type: type },
    });
    history.push('/new-profile/1');
  };

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Email Address:
          <input
            type="text"
            name="username"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <Box>
        <Chip
          className={classes.chips}
          onClick={() => setType('client')}
          label="I am a client."
          color={type === 'client' ? 'primary' : 'default'}
        />
        <Chip
          className={classes.chips}
          onClick={() => setType('provider')}
          label="I am a provider."
          color={type === 'provider' ? 'primary' : 'default'}
        />
      </Box>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
