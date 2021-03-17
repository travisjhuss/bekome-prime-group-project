import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  Grid,
  Switch,
  TextField,
  FormControlLabel,
  Box,
} from '@material-ui/core';
// Custom hooks
import useStyles from '../../hooks/useStyles';
// Components
import FormCheckboxes from '../FormCheckboxes/FormCheckboxes';

function EditProviderFormatsDialog({
  handleSubmit,
  dialogOpen,
  handleDialogs,
  handleInputs,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    accepting_clients,
    sliding_scale,
    license_number,
    state,
  } = useSelector((store) => store.forms.providerAnswers);

  const handleBooleans = (key, boolean) => {
    dispatch({
      type: 'SET_PROVIDER_PERSONAL_DETAILS',
      payload: { key, value: !boolean },
    });
  };

  return (
    <Dialog
      open={dialogOpen.formats}
      onClose={() => handleDialogs('formats')}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Edit Formats/Insurance</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography>I offer therapy in these formats:</Typography>
            <FormCheckboxes category={'formats'} />
            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={accepting_clients}
                    onChange={() =>
                      handleBooleans('accepting_clients', accepting_clients)
                    }
                  />
                }
                label="I'm currently accepting new clients"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={sliding_scale}
                    onChange={() =>
                      handleBooleans('sliding_scale', sliding_scale)
                    }
                  />
                }
                label="I offer sliding scale payments"
              />
            </Box>
            <TextField
              variant="outlined"
              label="License Number"
              className={classes.inputs}
              value={license_number || ''}
              onChange={handleInputs('license_number')}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>I accept insurance from these companies:</Typography>
            <FormCheckboxes category={'insurance'} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => handleDialogs('formats')}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSubmit();
            handleDialogs('formats');
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProviderFormatsDialog;
