import { useSelector } from 'react-redux';
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore, Edit } from '@material-ui/icons';

function BackgroundAccordion({ parsePreferences, edit }) {
  const { background, approach } = useSelector(
    (store) => store.providerDetails
  );

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">Background/Approach</Typography>
        {edit && <Edit />}
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography>A little about my background...</Typography>
          <Typography>{background}</Typography>
          <Typography>I would describe my approach as...</Typography>
          <Typography>{approach}</Typography>
          <Typography>
            Religious Affiliations: {parsePreferences('religions')}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default BackgroundAccordion;
