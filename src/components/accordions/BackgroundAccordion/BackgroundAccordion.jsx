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
// Custom hooks
import useStyles from '../../../hooks/useStyles';

// Displayed on ProviderDetails and EditProvider, if 'edit' prop is true,
// an edit icon is displayed which will open EditProviderBackgroundDialog
function BackgroundAccordion({
  parsePreferences,
  edit,
  setDialogOpen,
  openAccordion,
  handleOpenAccordion,
}) {
  const classes = useStyles();
  const { background, approach } = useSelector(
    (store) => store.providerDetails
  );

  return (
    <Accordion
      expanded={openAccordion === 'background'}
      onChange={handleOpenAccordion('background')}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography className={classes.accordionTitle} variant="h6">
          Background/Approach
        </Typography>
        {edit && (
          <IconButton
            onClick={(event) => {
              // event.stopPropagation() keeps the MUI accordion from
              // opening/closing when clicking the edit icon
              event.stopPropagation();
              setDialogOpen('background');
            }}
            onFocus={(event) => event.stopPropagation()}
          >
            <Edit />
          </IconButton>
        )}
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
