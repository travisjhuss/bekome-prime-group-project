import { useSelector } from 'react-redux';
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

function StrengthsAccordion({ parseString }) {
  const { strengths } = useSelector(
    (store) => store.providerDetails
  );
  const qualitiesString = parseString('qualities');

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">Strengths</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography>My clients would say I am... {strengths}</Typography>
          <Typography>
            I consider my top qualities to be... {qualitiesString}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default StrengthsAccordion;
