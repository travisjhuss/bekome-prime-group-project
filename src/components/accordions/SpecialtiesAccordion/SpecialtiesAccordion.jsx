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
// an edit icon is displayed which will open EditProviderSpecialtiesDialog
function SpecialtiesAccordion({
  parsePreferences,
  edit,
  setDialogOpen,
  openAccordion,
  handleOpenAccordion,
}) {
  const classes = useStyles();
  return (
    <Accordion
      expanded={openAccordion === 'specialties'}
      onChange={handleOpenAccordion('specialties')}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography className={classes.accordionTitle} variant="h6">
          Specialties
        </Typography>
        {edit && (
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              setDialogOpen('specialties');
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
