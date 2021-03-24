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
// Component imports
import useStyles from '../../../hooks/useStyles';

// Displayed on ProviderDetails and EditProvider, if 'edit' prop is true,
// an edit icon is displayed which will open EditProviderStrengthsDialog
function StrengthsAccordion({
  parsePreferences,
  edit,
  setDialogOpen,
  openAccordion,
  handleOpenAccordion,
}) {
  const classes = useStyles();
  const { strengths } = useSelector((store) => store.providerDetails);

  return (
    <Accordion
      expanded={openAccordion === 'strengths'}
      onChange={handleOpenAccordion('strengths')}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6" className={classes.accordionTitle}>
          Strengths
        </Typography>
        {edit && (
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              setDialogOpen('strengths');
            }}
            onFocus={(event) => event.stopPropagation()}
          >
            <Edit />
          </IconButton>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography>My clients would say I am... {strengths}</Typography>
          <Typography>
            I consider my top qualities to be... {parsePreferences('qualities')}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default StrengthsAccordion;
