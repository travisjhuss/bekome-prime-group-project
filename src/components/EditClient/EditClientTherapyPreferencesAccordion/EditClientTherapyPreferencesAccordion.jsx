import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Box,
  Button,
  Chip,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';

function EditClientTherapyPreferencesAccordion({
  handleInputs,
  handleSubmit,
  handleCancel,
  handleOpenAccordion,
  openAccordion,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { previous_therapy, previous_experience } = useSelector(
    (store) => store.forms.clientAnswers
  );

  const handleBoolean = (boolean) => {
    dispatch({
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: { key: 'previous_therapy', value: boolean },
    });
  };

  return (
    <Accordion
      expanded={openAccordion === 'therapyPreferences'}
      onChange={handleOpenAccordion('therapyPreferences')}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography className={classes.accordionTitle} variant="h6">
          Therapy Preferences
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.editClientAccordion}>
        <Typography>Have you seen a therapist before?</Typography>
        <Box paddingTop={1} paddingBottom={2}>
          <Chip
            className={classes.chipButtons}
            label="Yes"
            onClick={() => handleBoolean(true)}
            color={previous_therapy ? 'primary' : 'default'}
          />
          <Chip
            className={classes.chipButtons}
            label="No"
            onClick={() => handleBoolean(false)}
            color={previous_therapy ? 'default' : 'primary'}
          />
        </Box>
        <Typography gutterBottom>
          If so, how was your previous therapy experience?
        </Typography>
        <TextField
          disabled={!previous_therapy}
          label="Answer here"
          variant="outlined"
          multiline
          fullWidth
          rows={4}
          value={previous_experience || ''}
          onChange={handleInputs('previous_experience')}
        />
        <Box py={2}>
          <Typography>
            What kind of treatments are you interested in?
          </Typography>
          <FormCheckboxes category={'treatments'} limit={3} size="sm" />
        </Box>
        <Box display="flex" flexDirection="row-reverse">
          <Button
            variant="contained"
            color="primary"
            className={classes.editClientButton}
            onClick={handleSubmit}
          >
            Submit Changes
          </Button>
          <Button
            variant="contained"
            className={classes.editClientButton}
            onClick={() => {
              handleCancel();
              handleOpenAccordion(false);
            }}
          >
            Cancel
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default EditClientTherapyPreferencesAccordion;
