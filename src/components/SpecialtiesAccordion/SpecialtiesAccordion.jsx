import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

function SpecialtiesAccordion({ parseString }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">Specialties</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography>
            I am trained in... {parseString('treatments')}
          </Typography>
          <Typography>
            I excel at treating clients struggling with...{' '}
            {parseString('challenges')}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default SpecialtiesAccordion;
