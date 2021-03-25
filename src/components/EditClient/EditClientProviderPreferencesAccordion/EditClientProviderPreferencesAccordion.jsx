import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Grid,
  FormControlLabel,
  Switch,
  Divider,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';
import FormMenuChips from '../../FormMenuChips/FormMenuChips';

// Shows the client's preferences in a provider, in the forms of checkboxes
// and menu chips
function EditClientProviderPreferencesAccordion({
  handleSubmit,
  handleCancel,
  handleOpenAccordion,
  openAccordion,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { sliding_scale } = useSelector((store) => store.forms.clientAnswers);

  const handleBoolean = (boolean) => {
    dispatch({
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: { key: 'sliding_scale', value: boolean },
    });
  };

  return (
    <Accordion
      expanded={openAccordion === 'providerPreferences'}
      onChange={handleOpenAccordion('providerPreferences')}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography className={classes.accordionTitle} variant="h6">
          Provider Preferences
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box p={3}>
          <Typography>My ideal therapist would be:</Typography>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Box paddingBottom={1}>
                <FormCheckboxes category={'genders'} />
              </Box>
              <Divider />
              <Box paddingTop={1}>
                <FormCheckboxes category={'sexual_orientations'} />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <FormCheckboxes category={'ethnicities'} />
              <Box py={1}>
                <Typography gutterBottom>My therapist should speak:</Typography>
                <FormMenuChips category={'languages'} string={'Languages'} />
              </Box>
              <Box py={1}>
                <Typography gutterBottom>
                  My therapist's ideal religion would be:
                </Typography>
                <FormMenuChips category={'religions'} string={'Religions'} />
              </Box>
              <Box py={1}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={sliding_scale}
                      onChange={() => handleBoolean(!sliding_scale)}
                    />
                  }
                  label="I would like to see someone with sliding scale payments"
                />
              </Box>
            </Grid>
          </Grid>
          <Box display="flex" flexDirection="row-reverse" paddingTop={3}>
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
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default EditClientProviderPreferencesAccordion;
