import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from '@material-ui/core';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';
import S3Uploader from '../../S3Uploader/S3Uploader';

function EditClientCardDialog({
  handleSubmit,
  cardDialogOpen,
  setCardDialogOpen,
  handleInputs,
  handleCancel,
}) {
  const classes = useStyles();
  const {
    first_name,
    last_name,
    write_in_pronouns,
    date_of_birth,
    city,
    state,
    pic,
  } = useSelector((store) => store.forms.clientAnswers);
  const states = useSelector((store) => store.preferences).filter(
    (item) => item.category === 'states'
  );

  return (
    <Dialog
      open={cardDialogOpen}
      fullWidth
      maxWidth="md"
      onClose={() => setCardDialogOpen(false)}
    >
      <DialogTitle>Edit Personal Information</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="First Name"
              fullWidth
              className={classes.inputs}
              value={first_name || ''}
              onChange={handleInputs('first_name')}
            />
            <TextField
              variant="outlined"
              label="Last Name"
              fullWidth
              className={classes.inputs}
              value={last_name || ''}
              onChange={handleInputs('last_name')}
            />
            <Typography>
              What pronouns do you use? (select all that apply)
            </Typography>
            <FormCheckboxes category={'pronouns'} />
            <TextField
              variant="outlined"
              label="Other"
              className={classes.inputs}
              size="small"
              value={write_in_pronouns || ''}
              onChange={handleInputs('write_in_pronouns')}
            />
            <TextField
              type="date"
              variant="outlined"
              label="Date of Birth"
              className={classes.inputs}
              value={date_of_birth}
              onChange={handleInputs('date_of_birth') || ''}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="City"
              className={classes.inputs}
              value={city || ''}
              onChange={handleInputs('city')}
            />
            <FormControl variant="outlined">
              <InputLabel id="state-picker">State</InputLabel>
              <Select
                labelId="state-picker"
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
            <Typography>Upload a Photo:</Typography>
            <Typography variant="body2" gutterBottom>
              <i>not required</i>
            </Typography>
            <Box display="flex">
              <S3Uploader />
              <img className={classes.picPreview} src={pic} />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setCardDialogOpen(false);
            handleCancel();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSubmit();
            setCardDialogOpen(false);
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditClientCardDialog;
