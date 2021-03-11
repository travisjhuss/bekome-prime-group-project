import { useSelector } from 'react-redux';
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

function SpecialtiesAccordion() {
  const { preferences_array } = useSelector((store) => store.providerDetails);
  const preferences = useSelector((store) => store.preferences);

  const parseString = (category) => {
    return preferences
      .filter(
        (item) =>
          item.category === category && preferences_array?.indexOf(item.id) > -1
      )
      .reduce((string, item) => (string += `${item.name}, `), '')
      .slice(0, -2);
  };

  const treatmentsString = parseString('treatments');
  const challengesString = parseString('challenges');

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">Specialties</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography>I am trained in... {treatmentsString}</Typography>
          <Typography>
            I excel at treating clients struggling with... {challengesString}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default SpecialtiesAccordion;
