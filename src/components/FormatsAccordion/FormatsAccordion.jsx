import { useSelector } from 'react-redux';
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

function FormatsAccordion({ parsePreferences }) {
  const { insurance, sliding_scale } = useSelector(
    (store) => store.providerDetails
  );
  const formatsString = parsePreferences('formats');

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">Formats/Insurance</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography>
            I offer therapy in the following formats: {formatsString}
          </Typography>
          <Typography>
            {insurance ? 'I accept insurance.' : 'I do not accept insurance.'}
          </Typography>
          <Typography>
            {sliding_scale
              ? 'I offer sliding scale payment.'
              : 'I do not offer sliding scale payment.'}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default FormatsAccordion;
