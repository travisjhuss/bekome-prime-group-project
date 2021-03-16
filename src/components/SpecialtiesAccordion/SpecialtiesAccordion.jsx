import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore, Edit } from '@material-ui/icons';

function SpecialtiesAccordion({ parsePreferences, edit }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">Specialties</Typography>
        {edit && <Edit />}
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography>
            I am trained in... {parsePreferences('treatments')}
          </Typography>
          <Typography>
            I excel at treating clients with... {parsePreferences('challenges')}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default SpecialtiesAccordion;
