import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FavoriteProviderButton from '../../FavoriteProviderButton/FavoriteProviderButton';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import { LocationOn, Language, Edit } from '@material-ui/icons';
import useStyles from '../../../hooks/useStyles';

function UserCard({ provider, edit, setDialogOpen }) {
  const classes = useStyles();
  const history = useHistory();
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
    <Card className={classes.cardRoot}>
      <CardContent className={classes.cardHeader}>
        <Typography variant="h6" display="inline" color="secondary">
          {first_name} {last_name}
        </Typography>{' '}
        {user_type === 'client' && (
          <FavoriteProviderButton
            id={providers_users_id}
            saved={saved}
            type={'GET_PROVIDERS'}
          />
        )}
        {edit && (
          <IconButton onClick={() => setDialogOpen('card')}>
            <Edit />
          </IconButton>
        )}
        <br />
        <Typography variant="caption">
          {parsePreferences('pronouns')}
          {write_in_pronouns && `, ${write_in_pronouns}`}
        </Typography>
      </CardContent>
      <CardMedia className={classes.cardMedia} image={pic} />
      <CardContent className={classes.cardContent}>
        <Typography variant="body2">
          <LocationOn color="primary" /> {city}, {state}
        </Typography>
        <Typography variant="body2">
          <Language color="primary" /> {parsePreferences('languages')}
        </Typography>
        <br />
        {providerQuestions.map((question) =>
          findQuestion(question.id, question.content)
        )}
      </CardContent>
      <CardActions className={classes.cardButton}>
        {!edit && (
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={sendToDetails}
          >
            Full Profile
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default UserCard;
