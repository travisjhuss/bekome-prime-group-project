import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';

// Opened by clicking the edit button on SpecialtiesAccordion
function EditProviderSpecialtiesDialog({
  handleSubmit,
  dialogOpen,
  handleCancel,
}) {
  return (
    <Dialog
      open={dialogOpen === 'specialties'}
      onClose={handleCancel}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Edit Specialties</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography>I'm trained in these treatments:</Typography>
            <FormCheckboxes category={'treatments'} />
          </Grid>
          <Grid item xs={8}>
            <Typography>
              The challenges I most often help people with are:
            </Typography>
            <FormCheckboxes category={'challenges'} limit={5} size="lg" />
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

export default EditProviderSpecialtiesDialog;
