import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  Typography,
  TextField,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';
import useStyles from '../../../hooks/useStyles';
import S3Uploader from '../../S3Uploader/S3Uploader';

function ClientForm1Info({ handleInputs }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    first_name,
    last_name,
    write_in_pronouns,
    date_of_birth,
    city,
    state,
  } = useSelector((store) => store.forms.clientAnswers);
  const states = useSelector((store) => store.preferences).filter(
    (item) => item.category === 'states'
  );

  const handleConnorData = () => {
    dispatch({
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: { key: 'first_name', value: 'Connor' },
    });
    dispatch({
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: { key: 'last_name', value: 'Detviler' },
    });
    dispatch({
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: { key: 'date_of_birth', value: '1995-06-24' },
    });
    dispatch({
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: { key: 'city', value: 'Minneapolis' },
    });
    dispatch({
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: { key: 'state', value: 'Minnesota' },
    });
  };

  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            variant="outlined"
            label="First Name"
            className={classes.inputs}
            value={first_name || ''}
            onChange={handleInputs('first_name')}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Last Name"
            className={classes.inputs}
            value={last_name || ''}
            onChange={handleInputs('last_name')}
          />
          <TextField
            fullWidth
            type="date"
            variant="outlined"
            label="Date of Birth"
            className={classes.inputs}
            value={date_of_birth}
            onChange={handleInputs('date_of_birth') || ''}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="City"
            className={classes.inputs}
            value={city || ''}
            onChange={handleInputs('city')}
          />
          <FormControl variant="outlined">
            <InputLabel id="state-picker">State</InputLabel>
            <Select
              className={classes.stateSelect}
              label="State"
              value={state || ''}
              onChange={handleInputs('state')}
            >
              {states.map((state, i) => (
                <MenuItem key={i} value={state.name}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Typography gutterBottom onClick={handleConnorData}>
            <b>What pronouns do you use?</b>
          </Typography>
          <Typography variant="body2" gutterBottom>
            <i>select all that apply</i>
          </Typography>
          <FormCheckboxes category={'pronouns'} />
          <Box>
            <TextField
              variant="outlined"
              label="Other"
              size="small"
              className={classes.inputs}
              value={write_in_pronouns || ''}
              onChange={handleInputs('write_in_pronouns')}
            />
          </Box>
          <Typography gutterBottom>
            <b>Add a profile photo:</b>
          </Typography>
          <Typography variant="body2" gutterBottom>
            <i>not required</i>
          </Typography>
          <S3Uploader picOrVideo="pic" />
        </Grid>
        <Grid item xs={4}>
          <Typography>
            <b>What kind of insurance do you have?</b>
          </Typography>
          <FormCheckboxes category={'insurance'} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ClientForm1Info;
