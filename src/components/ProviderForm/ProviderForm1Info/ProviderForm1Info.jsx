import { useSelector } from 'react-redux';
import {
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
} from '@material-ui/core';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';
import FormMenuChips from '../../FormMenuChips/FormMenuChips';
import S3Uploader from '../../S3Uploader/S3Uploader';

// Part of provider form stepper, entering in personal details
// and demographic information
function ProviderForm1Info({ handleInputs }) {
  const classes = useStyles();
  const {
    first_name,
    last_name,
    write_in_pronouns,
    date_of_birth,
    city,
    state,
  } = useSelector((store) => store.forms.providerAnswers);
  // List of states, filtered from preferences table on db
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
          </Box>
        </Grid>
        <Grid item container xs={6}>
          <Grid item xs={6}>
            <Typography>
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
              <b>Upload a Photo:</b>
            </Typography>
            <S3Uploader picOrVideo="pic" />
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Typography gutterBottom>
            <b>Where is your practice located?</b>
          </Typography>
          <TextField
            variant="outlined"
            label="City"
            fullWidth
            className={classes.inputs}
            value={city || ''}
            onChange={handleInputs('city')}
          />
          <FormControl variant="outlined" className={classes.stateSelect}>
            <InputLabel id="state-picker">State</InputLabel>
            <Select
              labelId="state-picker"
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
        <Grid item xs={6}>
          <Box pb={4}>
            <Typography gutterBottom>
              <b>What languages do you speak?</b>
            </Typography>
            <FormMenuChips category={'languages'} string={'Languages'} />
          </Box>
          <Box pb={3}>
            <Typography gutterBottom>
              <b>What best describes your religion?</b>
            </Typography>
            <FormMenuChips category={'religions'} string={'Religions'} />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Typography gutterBottom>
            <b>What best describes your gender?</b>
          </Typography>
          <Typography variant="body2">
            <i>Select all that apply</i>
          </Typography>
          <FormCheckboxes category={'genders'} />
        </Grid>
        <Grid item xs={4}>
          <Typography gutterBottom>
            <b>What best describes your sexual orientation?</b>
          </Typography>
          <FormCheckboxes category={'sexual_orientations'} />
        </Grid>
        <Grid item xs={4}>
          <Typography gutterBottom>
            <b>What best describes your race?</b>
          </Typography>
          <FormCheckboxes category={'ethnicities'} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProviderForm1Info;
