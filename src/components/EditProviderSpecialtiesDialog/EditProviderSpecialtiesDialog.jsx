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
import FormCheckboxes from '../FormCheckboxes/FormCheckboxes';

function EditProviderSpecialtiesDialog({
  handleSubmit,
  dialogOpen,
  handleDialogs,
}) {
  return (
    <Dialog
      open={dialogOpen.specialties}
      onClose={() => handleDialogs('specialties')}
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
            <FormCheckboxes category={'challenges'} limit={5} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => handleDialogs('specialties')}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSubmit();
            handleDialogs('specialties');
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProviderSpecialtiesDialog;
