import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Button } from '@material-ui/core';
// Custom hooks
import useStyles from '../../hooks/useStyles';
// Component imports
import FavoriteProviderButton from '../FavoriteProviderButton/FavoriteProviderButton';
import QuestionAccordion from '../accordions/QuestionAccordion/QuestionAccordion';
import StrengthsAccordion from '../accordions/StrengthsAccordion/StrengthsAccordion';
import BackgroundAccordion from '../accordions/BackgroundAccordion/BackgroundAccordion';
import SpecialtiesAccordion from '../accordions/SpecialtiesAccordion/SpecialtiesAccordion';
import FormatsAccordion from '../accordions/FormatsAccordion/FormatsAccordion';
import VideoModal from '../VideoModal/VideoModal';

function ProviderDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    providers_users_id,
    first_name,
    last_name,
    pic,
    video,
    city,
    state,
    age,
    saved,
    write_in_pronouns,
    preferences_array,
  } = useSelector((store) => store.providerDetails);
  const preferences = useSelector((store) => store.preferences);
  const { id } = useParams();
  const [openAccordion, setOpenAccordion] = useState('questions');
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROVIDER_DETAILS', payload: id });
    dispatch({ type: 'GET_PROVIDERS' });
    dispatch({ type: 'FETCH_PREFERENCES' });
  }, []);

  const parsePreferences = (category) => {
    return preferences
      .filter((item) => {
        return (
          item.category === category && preferences_array?.includes(item.id)
        );
      })
      .reduce((string, item) => (string += `${item.name}, `), '')
      .slice(0, -2);
  };

  const handleOpenAccordion = (panel) => (event, isExpanded) => {
    setOpenAccordion(isExpanded ? panel : false);
  };

  return (
    <>
      <VideoModal
        modalState={modalState}
        setModalState={setModalState}
        video={'http://techslides.com/demos/sample-videos/small.webm'}
      />
      <Box p={4}>
        <Box display="flex" alignItems="center" ml={4}>
          <Typography variant="h4">
            {first_name} {last_name}
          </Typography>
          <FavoriteProviderButton
            id={providers_users_id}
            saved={saved}
            type={'FETCH_PROVIDER_DETAILS'}
          />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box display="flex">
              <img src={pic} className={classes.pic} />
              <Box mt={6}>
                <Typography gutterBottom={true}>Age: {age}</Typography>
                <Typography gutterBottom={true}>
                  Pronouns: {parsePreferences('pronouns')}
                  {write_in_pronouns && `, ${write_in_pronouns}`}
                </Typography>
                <Typography gutterBottom={true}>
                  Location: {city}, {state}
                </Typography>
                <Typography gutterBottom={true}>
                  Languages: {parsePreferences('languages')}
                </Typography>
                <Typography gutterBottom={true}>
                  Religious Affiliations: {parsePreferences('religions')}
                </Typography>
                <Box>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() =>
                      dispatch({
                        type: 'OPEN_MESSAGE_WINDOW',
                        payload: {
                          sentName: first_name,
                          sentPic: pic,
                          sentId: providers_users_id,
                        },
                      })
                    }
                  >
                    Send Message
                  </Button>
                </Box>
                <Box mt={2}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setModalState(true)}
                  >
                    Watch Video
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box boxShadow={2}>
              <QuestionAccordion
                openAccordion={openAccordion}
                handleOpenAccordion={handleOpenAccordion}
              />
              <StrengthsAccordion
                openAccordion={openAccordion}
                handleOpenAccordion={handleOpenAccordion}
                parsePreferences={parsePreferences}
              />
              <BackgroundAccordion
                openAccordion={openAccordion}
                handleOpenAccordion={handleOpenAccordion}
                parsePreferences={parsePreferences}
              />
              <SpecialtiesAccordion
                openAccordion={openAccordion}
                handleOpenAccordion={handleOpenAccordion}
                parsePreferences={parsePreferences}
              />
              <FormatsAccordion
                openAccordion={openAccordion}
                handleOpenAccordion={handleOpenAccordion}
                parsePreferences={parsePreferences}
              />
            </Box>
          </Grid>
          {/* <Grid item alignContent="center">
            <Box boxShadow={2} alignItems="center" p={2}>
              <video controls>
              <source src="http://techslides.com/demos/sample-videos/small.webm" type="video/webm" /> 
              </video>
            </Box>
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
}

export default ProviderDetails;
