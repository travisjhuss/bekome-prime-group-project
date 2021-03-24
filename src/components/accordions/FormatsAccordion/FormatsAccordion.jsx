import { useSelector } from 'react-redux';
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@material-ui/core';
import { ExpandMore, Edit } from '@material-ui/icons';
import useStyles from '../../../hooks/useStyles';

// Displayed on ProviderDetails and EditProvider, if 'edit' prop is true,
// an edit icon is displayed which will open EditProviderFormatsDialog
function FormatsAccordion({
  parsePreferences,
  edit,
  setDialogOpen,
  openAccordion,
  handleOpenAccordion,
}) {
  const classes = useStyles();
  const {
    license_number,
    sliding_scale,
    accepting_clients,
    state,
  } = useSelector((store) => store.providerDetails);

  return (
    <Accordion
      expanded={openAccordion === 'formats'}
      onChange={handleOpenAccordion('formats')}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography className={classes.accordionTitle} variant="h6">
          Formats/Insurance
        </Typography>
        {edit && (
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              setDialogOpen('formats');
            }}
            onFocus={(event) => event.stopPropagation()}
          >
            <Edit />
          </IconButton>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography>
            I offer therapy in the following formats:{' '}
            {parsePreferences('formats')}
          </Typography>
          <Typography>
            I accept insurance from: {parsePreferences('insurance')}
          </Typography>
          <Typography>
            {state} License Number: {license_number}
          </Typography>
          <Typography>
            {sliding_scale
              ? 'I offer sliding scale payment.'
              : 'I do not offer sliding scale payment.'}
          </Typography>
          <Typography>
            {accepting_clients
              ? 'I am accepting new clients.'
              : 'I am not accepting new clients at this time.'}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default FormatsAccordion;
