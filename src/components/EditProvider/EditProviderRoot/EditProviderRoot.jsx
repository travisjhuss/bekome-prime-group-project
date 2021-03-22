import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Grid } from '@material-ui/core';
// Components
import QuestionAccordion from '../../accordions/QuestionAccordion/QuestionAccordion';
import StrengthsAccordion from '../../accordions/StrengthsAccordion/StrengthsAccordion';
import BackgroundAccordion from '../../accordions/BackgroundAccordion/BackgroundAccordion';
import SpecialtiesAccordion from '../../accordions/SpecialtiesAccordion/SpecialtiesAccordion';
import FormatsAccordion from '../../accordions/FormatsAccordion/FormatsAccordion';
import UserCard from '../../cards/UserCard/UserCard';
import EditProviderQuestionsDialog from '../EditProviderQuestionsDialog/EditProviderQuestionsDialog';
import EditProviderStrengthsDialog from '../EditProviderStrengthsDialog/EditProviderStrengthsDialog';
import EditProviderBackgroundDialog from '../EditProviderBackgroundDialog/EditProviderBackgroundDialog';
import EditProviderSpecialtiesDialog from '../EditProviderSpecialtiesDialog/EditProviderSpecialtiesDialog';
import EditProviderFormatsDialog from '../EditProviderFormatsDialog/EditProviderFormatsDialog';
import EditProviderCardDialog from '../EditProviderCardDialog/EditProviderCardDialog';

function EditProviderRoot() {
  const dispatch = useDispatch();
  const { id } = useSelector((store) => store.user);
  const provider = useSelector((store) => store.providerDetails);
  const providerAnswers = useSelector((store) => store.forms.providerAnswers);
  const preferences = useSelector((store) => store.preferences);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('questions');

  useEffect(() => {
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

  const handleOpenAccordion = (panel) => (event, isExpanded) => {
    setOpenAccordion(isExpanded ? panel : false);
  };

  const handleCancel = () => {
    dispatch({ type: 'FETCH_EDIT_PROVIDER_PROFILE', payload: id });
    setDialogOpen(false);
  };

  const handleSubmit = () => {
    dispatch({
      type: 'SUBMIT_PROVIDER_EDITS',
      payload: { answers: providerAnswers, id },
    });
    setDialogOpen(false);
  };

  return (
    <>
      <Box p={3}>
        <Grid container>
          <Grid item xs={4}>
            <center>
              <UserCard
                provider={provider}
                edit={true}
                setDialogOpen={setDialogOpen}
              />
            </center>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5">Edit Profile</Typography>
            <QuestionAccordion
              edit={true}
              setDialogOpen={setDialogOpen}
              openAccordion={openAccordion}
              handleOpenAccordion={handleOpenAccordion}
            />
            <StrengthsAccordion
              parsePreferences={parsePreferences}
              edit={true}
              setDialogOpen={setDialogOpen}
              openAccordion={openAccordion}
              handleOpenAccordion={handleOpenAccordion}
            />
            <BackgroundAccordion
              parsePreferences={parsePreferences}
              edit={true}
              setDialogOpen={setDialogOpen}
              openAccordion={openAccordion}
              handleOpenAccordion={handleOpenAccordion}
            />
            <SpecialtiesAccordion
              parsePreferences={parsePreferences}
              edit={true}
              setDialogOpen={setDialogOpen}
              openAccordion={openAccordion}
              handleOpenAccordion={handleOpenAccordion}
            />
            <FormatsAccordion
              parsePreferences={parsePreferences}
              edit={true}
              setDialogOpen={setDialogOpen}
              openAccordion={openAccordion}
              handleOpenAccordion={handleOpenAccordion}
            />
          </Grid>
        </Grid>
      </Box>
      <EditProviderQuestionsDialog
        handleSubmit={handleSubmit}
        dialogOpen={dialogOpen}
        handleCancel={handleCancel}
      />
      <EditProviderStrengthsDialog
        handleSubmit={handleSubmit}
        dialogOpen={dialogOpen}
        handleInputs={handleInputs}
        handleCancel={handleCancel}
      />
      <EditProviderBackgroundDialog
        handleSubmit={handleSubmit}
        dialogOpen={dialogOpen}
        handleInputs={handleInputs}
        handleCancel={handleCancel}
      />
      <EditProviderSpecialtiesDialog
        handleSubmit={handleSubmit}
        dialogOpen={dialogOpen}
        handleCancel={handleCancel}
      />
      <EditProviderFormatsDialog
        handleSubmit={handleSubmit}
        dialogOpen={dialogOpen}
        handleInputs={handleInputs}
        handleCancel={handleCancel}
      />
      <EditProviderCardDialog
        handleSubmit={handleSubmit}
        dialogOpen={dialogOpen}
        handleInputs={handleInputs}
        handleCancel={handleCancel}
      />
    </>
  );
}

export default EditProviderRoot;
