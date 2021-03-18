import { useSelector } from 'react-redux';
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
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';

function EditProviderStrengthsDialog({
  handleSubmit,
  dialogOpen,
  handleCancel,
  handleInputs,
}) {
  const classes = useStyles();
  const { strengths } = useSelector((store) => store.forms.providerAnswers);

  return (
    <Dialog open={dialogOpen === 'strengths'} onClose={handleCancel}>
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
              value={strengths}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>My biggest strengths as a therapist are:</Typography>
            <FormCheckboxes category={'qualities'} limit={5} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProviderStrengthsDialog;
