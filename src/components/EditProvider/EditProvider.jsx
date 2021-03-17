import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Grid } from '@material-ui/core';

// Custom hooks
import useStyles from '../../hooks/useStyles';

// Components
import QuestionAccordion from '../QuestionAccordion/QuestionAccordion';
import StrengthsAccordion from '../StrengthsAccordion/StrengthsAccordion';
import BackgroundAccordion from '../BackgroundAccordion/BackgroundAccordion';
import SpecialtiesAccordion from '../SpecialtiesAccordion/SpecialtiesAccordion';
import FormatsAccordion from '../FormatsAccordion/FormatsAccordion';
import UserCard from '../UserCard/UserCard';
import EditProviderQuestionsDialog from '../EditProviderQuestionsDialog/EditProviderQuestionsDialog';
import EditProviderStrengthsDialog from '../EditProviderStrengthsDialog/EditProviderStrengthsDialog';
import EditProviderBackgroundDialog from '../EditProviderBackgroundDialog/EditProviderBackgroundDialog';
import EditProviderSpecialtiesDialog from '../EditProviderSpecialtiesDialog/EditProviderSpecialtiesDialog';
import EditProviderFormatsDialog from '../EditProviderFormatsDialog/EditProviderFormatsDialog';
import EditProviderCardDialog from '../EditProviderCardDialog/EditProviderCardDialog';

function EditProvider() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useSelector((store) => store.user);
  const provider = useSelector((store) => store.providerDetails);
  const providerAnswers = useSelector((store) => store.forms.providerAnswers);
  const preferences = useSelector((store) => store.preferences);
  const [dialogOpen, setDialogOpen] = useState({
    questions: false,
    strengths: false,
    background: false,
    specialties: false,
    formats: false,
    card: false,
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_PROVIDER_DETAILS', payload: id });
    dispatch({ type: 'FETCH_EDIT_PROVIDER_PROFILE', payload: id });
    dispatch({ type: 'FETCH_PREFERENCES' });
  }, []);

  const parsePreferences = (category) => {
    return preferences
      .filter((item) => {
        return (
          item.category === category &&
          provider.preferences_array?.includes(item.id)
        );
      })
      .reduce((string, item) => (string += `${item.name}, `), '')
      .slice(0, -2);
  };

  const handleInputs = (key) => (event) => {
    dispatch({
      type: 'SET_PROVIDER_PERSONAL_DETAILS',
      payload: { key, value: event.target.value },
    });
  };

  const handleDialogs = (whichDialog) => {
    setDialogOpen({ ...dialogOpen, [whichDialog]: !dialogOpen[whichDialog] });
  };

  const handleSubmit = () => {
    dispatch({
      type: 'SUBMIT_PROVIDER_EDITS',
      payload: { answers: providerAnswers, id: provider.providers_users_id },
    });
  };

  return (
    <>
      <Box p={2}>
        <Typography>Edit Profile</Typography>
        <Grid container>
          <Grid item xs={4}>
            <UserCard
              provider={provider}
              edit={true}
              handleDialogs={handleDialogs}
            />
          </Grid>
          <Grid item xs={8}>
            <QuestionAccordion edit={true} handleDialogs={handleDialogs} />
            <StrengthsAccordion
              parsePreferences={parsePreferences}
              edit={true}
              handleDialogs={handleDialogs}
            />
            <BackgroundAccordion
              parsePreferences={parsePreferences}
              edit={true}
              handleDialogs={handleDialogs}
            />
            <SpecialtiesAccordion
              parsePreferences={parsePreferences}
              edit={true}
              handleDialogs={handleDialogs}
            />
            <FormatsAccordion
              parsePreferences={parsePreferences}
              edit={true}
              handleDialogs={handleDialogs}
            />
          </Grid>
        </Grid>
      </Box>
      <EditProviderQuestionsDialog
        handleSubmit={handleSubmit}
        dialogOpen={dialogOpen}
        handleDialogs={handleDialogs}
      />
      <EditProviderStrengthsDialog
        handleSubmit={handleSubmit}
        dialogOpen={dialogOpen}
        handleDialogs={handleDialogs}
        handleInputs={handleInputs}
      />
      <EditProviderBackgroundDialog
        handleSubmit={handleSubmit}
        dialogOpen={dialogOpen}
        handleDialogs={handleDialogs}
        handleInputs={handleInputs}
      />
      <EditProviderSpecialtiesDialog
        handleSubmit={handleSubmit}
        dialogOpen={dialogOpen}
        handleDialogs={handleDialogs}
      />
      <EditProviderFormatsDialog
        handleSubmit={handleSubmit}
        dialogOpen={dialogOpen}
        handleDialogs={handleDialogs}
        handleInputs={handleInputs}
      />
      <EditProviderCardDialog
        handleSubmit={handleSubmit}
        dialogOpen={dialogOpen}
        handleDialogs={handleDialogs}
        handleInputs={handleInputs}
      />
    </>
  );
}

export default EditProvider;
