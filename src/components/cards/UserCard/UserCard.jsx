import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteProviderButton from '../../FavoriteProviderButton/FavoriteProviderButton';
import {
  Card,
  CardHeader,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  Dialog,
  Tooltip,
  Box,
} from '@material-ui/core';
import {
  LocationOn,
  Language,
  Edit,
  PersonAdd,
  PlayCircleFilled,
} from '@material-ui/icons';
import useStyles from '../../../hooks/useStyles';

function UserCard({ provider, edit, setDialogOpen }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user_type } = useSelector((store) => store.user);
  const providerQuestions = useSelector((store) => store.providerQuestions);
  const preferences = useSelector((store) => store.preferences);
  const {
    providers_users_id,
    first_name,
    last_name,
    pic,
    preferences_array,
    write_in_pronouns,
    video,
    questions,
    city,
    state,
    accepting_clients,
    saved,
  } = provider;
  const [videoOpen, setVideoOpen] = useState(false);

  const handleVideo = () => {
    setVideoOpen(!videoOpen);
  };

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

  const sendToDetails = () => {
    history.push(`/provider-details/${providers_users_id}`);
  };

  // Find method finds the question that the provider has an answer to
  // Also checks to see whether the provider wants this question on their card
  const findQuestion = (id, content) => {
    const foundQuestion = questions?.find((item) => item.questions_id === id);
    if (foundQuestion?.displayed_on_card === true) {
      return (
        <Typography key={id} variant="body2">
          <b>{content}</b> {foundQuestion.answer}
        </Typography>
      );
    }
  };

  return (
    <>
      <Card className={classes.cardRoot} raised={true}>
        <CardHeader
          className={classes.cardHeader}
          action={
            edit ? (
              <IconButton onClick={() => setDialogOpen('card')}>
                <Edit />
              </IconButton>
            ) : (
              <FavoriteProviderButton
                id={providers_users_id}
                saved={saved}
                type={'GET_PROVIDERS'}
              />
            )
          }
          title={
            <Typography variant="h6" color="secondary">
              {first_name} {last_name}
            </Typography>
          }
          subheader={
            <Typography variant="caption">
              {parsePreferences('pronouns')}
              {write_in_pronouns && `, ${write_in_pronouns}`}
            </Typography>
          }
        />
        {user_type === 'client' ? (
          <CardActionArea onClick={sendToDetails}>
            <CardMedia className={classes.cardMedia} image={pic} />
          </CardActionArea>
        ) : (
          <CardMedia className={classes.cardMedia} image={pic} />
        )}
        <CardContent className={classes.cardContent}>
          <Box display="flex">
            <Box display="flex" flexGrow={1} alignItems="center">
              <LocationOn className={classes.userCardIcons} color="primary" />
              <Typography variant="body2">
                {city}, {state}
              </Typography>
            </Box>
            {video && (
              <Tooltip title="View Video">
                <IconButton
                  onClick={handleVideo}
                  className={classes.videoBtn}
                  color="secondary"
                  size="small"
                >
                  <PlayCircleFilled />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Box display="flex" alignItems="center" paddingTop={0.5}>
            <Language className={classes.userCardIcons} color="primary" />
            <Typography variant="body2">
              {parsePreferences('languages')}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" paddingTop={0.5}>
            {accepting_clients && (
              <>
                <PersonAdd color="primary" className={classes.userCardIcons} />
                <Typography variant="body2">Accepting new clients</Typography>
              </>
            )}
          </Box>
          <br />
          {providerQuestions.map((question) =>
            findQuestion(question.id, question.content)
          )}
        </CardContent>
        <CardActions className={classes.cardButton}>
          {!edit && (
            <>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={sendToDetails}
              >
                Full Profile
              </Button>
              <Button
                variant="contained"
                size="small"
                color="secondary"
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
            </>
          )}
        </CardActions>
      </Card>
      <Dialog open={videoOpen} onClose={handleVideo}>
        <video src={video} controls className={classes.video} />
      </Dialog>
    </>
  );
}

export default UserCard;
