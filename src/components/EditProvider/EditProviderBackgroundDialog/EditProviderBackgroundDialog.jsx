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
  Box,
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
    <Dialog
      open={dialogOpen === 'background'}
      onClose={handleCancel}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Edit Background/Approach</DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Typography gutterBottom>
              <b>A little about my background...</b>
            </Typography>
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
            <Typography gutterBottom>
              <b>I would describe my approach as...</b>
            </Typography>
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
          <Grid item xs={6}>
            <Typography>
              <b>What best describes your gender?</b>
            </Typography>
            <Typography>
              <i>select all that apply</i>
            </Typography>
            <FormCheckboxes category={'genders'} size="sm" />
            <Box pt={3}>
              <Typography gutterBottom>
                <b>What best describes your religion?</b>
              </Typography>
              <FormMenuChips category={'religions'} string={'Religions'} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>
              <b>What best describes your race?</b>
            </Typography>
            <FormCheckboxes category={'ethnicities'} />
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

export default EditProviderBackgroundDialog;
