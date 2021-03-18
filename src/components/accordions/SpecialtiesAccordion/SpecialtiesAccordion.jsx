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

function SpecialtiesAccordion({ parsePreferences, edit, handleDialogs }) {
  const classes = useStyles();
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography className={classes.accordionTitle} variant="h6">
          Specialties
        </Typography>
        {edit && (
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              handleDialogs('specialties');
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
