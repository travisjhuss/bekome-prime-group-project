import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  TextField,
  Grid,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
// Custom hooks
import useStyles from '../../hooks/useStyles';
// Components
import FormCheckboxes from '../FormCheckboxes/FormCheckboxes';

function EditProviderStrengthsDialog({
  handleSubmit,
  dialogOpen,
  handleDialogs,
  handleInputs,
}) {
  const providerAnswers = useSelector((store) => store.forms.providerAnswers);
  const classes = useStyles();
  return (
    <Dialog
      open={dialogOpen.strengths}
      onClose={() => handleDialogs('strengths')}
    >
      <DialogTitle>Edit Strengths</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography>My clients would describe me as:</Typography>
            <TextField
              className={classes.inputs}
              variant="outlined"
              multiline
              fullWidth
              rows={6}
              label="Answer here"
              onChange={handleInputs('strengths')}
              value={providerAnswers.strengths}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>My biggest strengths as a therapist are:</Typography>
            <FormCheckboxes category={'qualities'} limit={5} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => handleDialogs('strengths')}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSubmit();
            handleDialogs('strengths');
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProviderStrengthsDialog;
