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
import FormMenuChips from '../../FormMenuChips/FormMenuChips';
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';

function EditProviderBackgroundDialog({
  handleSubmit,
  dialogOpen,
  handleInputs,
  handleCancel,
}) {
  const classes = useStyles();
  const { background, approach } = useSelector(
    (store) => store.forms.providerAnswers
  );

  return (
    <Dialog open={dialogOpen === 'background'} onClose={handleCancel}>
      <DialogTitle>Edit Background/Approach</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography>A little about my background...</Typography>
            <TextField
              className={classes.inputs}
              variant="outlined"
              multiline
              fullWidth
              rows={6}
              label="Answer here"
              onChange={handleInputs('background')}
              value={background}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>I would describe my approach as...</Typography>
            <TextField
              className={classes.inputs}
              variant="outlined"
              multiline
              fullWidth
              rows={6}
              label="Answer here"
              onChange={handleInputs('approach')}
              value={approach}
            />
          </Grid>
          <Grid item>
            <Typography>
              What best describes your gender? (select all that apply)
            </Typography>
            <FormCheckboxes category={'genders'} />
            <Typography>What best describes your race?</Typography>
            <FormCheckboxes category={'ethnicities'} />
          </Grid>
        </Grid>
        <Typography>What best describes your religion?</Typography>
        <FormMenuChips category={'religions'} string={'Religions'} />
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

export default EditProviderBackgroundDialog;
