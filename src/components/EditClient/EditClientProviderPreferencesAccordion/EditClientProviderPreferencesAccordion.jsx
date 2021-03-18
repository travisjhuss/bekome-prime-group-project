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
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';
import FormMenuChips from '../../FormMenuChips/FormMenuChips';

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
      <AccordionDetails className={classes.editClientAccordion}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography>My ideal therapist would be:</Typography>
            <FormCheckboxes category={'genders'} />
            <FormCheckboxes category={'sexual_orientations'} />
            <FormCheckboxes category={'ethnicities'} />
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={6}>
              <Typography>My therapist should speak:</Typography>
              <FormMenuChips category={'languages'} string={'Languages'} />
              <Typography>My therapist's ideal religion would be:</Typography>
              <FormMenuChips category={'religions'} string={'Religions'} />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={sliding_scale}
                    onChange={() => handleBoolean(!sliding_scale)}
                  />
                }
                label="I would like to see someone with sliding scale payments"
              />
            </Grid>
          </Grid>
        </Grid>
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

export default EditClientProviderPreferencesAccordion;
