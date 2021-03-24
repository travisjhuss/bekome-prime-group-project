import { useSelector } from 'react-redux';
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

// First of new client profile stepper, handles client personal information
function ClientForm1Info({ handleInputs }) {
  const classes = useStyles();
  const {
    first_name,
    last_name,
    write_in_pronouns,
    date_of_birth,
    city,
    state,
  } = useSelector((store) => store.forms.clientAnswers);
  // This gets the list of states from the preferences table on the db
  const states = useSelector((store) => store.preferences).filter(
    (item) => item.category === 'states'
  );

  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
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
          <Box width="75%">
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
            <FormControl variant="outlined" className={classes.stateSelect}>
              <InputLabel id="state-picker">State</InputLabel>
              <Select
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
          </Box>
        </Grid>
        <Grid item container xs={6}>
          <Grid item xs={6}>
            <Typography gutterBottom>
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
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>
              <b>Add a profile photo:</b>
            </Typography>
            <Typography variant="body2" gutterBottom>
              <i>not required</i>
            </Typography>
            <S3Uploader picOrVideo="pic" />
          </Grid>
          <Grid item xs={12}>
            <Box pt={3}>
              <Typography>
                <b>What kind of insurance do you have?</b>
              </Typography>
              <FormCheckboxes category={'insurance'} size="sm" />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ClientForm1Info;
