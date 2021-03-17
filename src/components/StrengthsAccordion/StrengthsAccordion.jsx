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
import useStyles from '../../hooks/useStyles';

function StrengthsAccordion({ parsePreferences, edit, handleDialogs }) {
  const classes = useStyles();
  const { strengths } = useSelector((store) => store.providerDetails);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6" className={classes.accordionTitle}>
          Strengths
        </Typography>
        {edit && (
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              handleDialogs('strengths');
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
