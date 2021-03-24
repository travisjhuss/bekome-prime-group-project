import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  TextField,
  Box,
} from '@material-ui/core';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';

// Opened by clicking the edit button on StrengthsAccordion
// Provider can edit their answer to their strengths, and their qualities
function EditProviderStrengthsDialog({
  handleSubmit,
  dialogOpen,
  handleCancel,
  handleInputs,
}) {
  const classes = useStyles();
  const { strengths } = useSelector((store) => store.forms.providerAnswers);

  return (
    <Dialog
      open={dialogOpen === 'strengths'}
      onClose={handleCancel}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Edit Strengths</DialogTitle>
      <DialogContent>
        <Box pb={2}>
          <Typography gutterBottom>
            <b>My clients would describe me as:</b>
          </Typography>
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
        </Box>
        <Typography>
          <b>My biggest strengths as a therapist are:</b>
        </Typography>
        <FormCheckboxes category={'qualities'} limit={5} size="sm" />
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
