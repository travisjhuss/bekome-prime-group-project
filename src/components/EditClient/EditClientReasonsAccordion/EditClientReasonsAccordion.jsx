import { useSelector } from 'react-redux';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Box,
  Button,
} from '@material-ui/core';
import { ExpandMore, Edit } from '@material-ui/icons';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';

function EditClientReasonsAccordion({
  handleInputs,
  handleSubmit,
  handleCancel,
  handleOpenAccordion,
  openAccordion,
}) {
  const classes = useStyles();
  const { primary_reason } = useSelector((store) => store.forms.clientAnswers);

  return (
    <Accordion
      expanded={openAccordion === 'reasons'}
      onChange={handleOpenAccordion('reasons')}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography className={classes.accordionTitle} variant="h6">
          Reasons/Challenges
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.editClientAccordion}>
        <Typography gutterBottom>
          What is your primary reason for seeking therapy?
        </Typography>
        <TextField
          variant="outlined"
          label="Answer here"
          multiline
          fullWidth
          rows={4}
          className={classes.inputs}
          value={primary_reason || ''}
          onChange={handleInputs('primary_reason')}
        />
        <Box paddingTop={2}>
          <Typography>What are you struggling with?</Typography>
          <FormCheckboxes category={'challenges'} />
        </Box>
        <Box display="flex" flexDirection="row-reverse">
          <Button
            variant="contained"
            color="primary"
            className={classes.editClientButton}
            onClick={handleSubmit}
          >
            Submit Changes
          </Button>
          <Button
            variant="contained"
            className={classes.editClientButton}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default EditClientReasonsAccordion;
