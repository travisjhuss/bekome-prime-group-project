import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';

// Providers qualities the client can choose from, this is the first
// accordion open when a client goes to their edit page
function EditClientProviderQualitiesAccordion({
  handleSubmit,
  handleCancel,
  handleOpenAccordion,
  openAccordion,
}) {
  const classes = useStyles();

  return (
    <Accordion
      expanded={openAccordion === 'providerQualities'}
      onChange={handleOpenAccordion('providerQualities')}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography className={classes.accordionTitle} variant="h6">
          Therapist Qualities
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.editClientAccordion}>
        <Typography>What qualities do you look for in a therapist?</Typography>
        <FormCheckboxes category={'qualities'} limit={5} size="sm" />
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
            onClick={() => {
              handleCancel();
              handleOpenAccordion(false);
            }}
          >
            Cancel
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default EditClientProviderQualitiesAccordion;
