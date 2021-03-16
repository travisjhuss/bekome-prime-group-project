import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteProviderButton from '../FavoriteProviderButton/FavoriteProviderButton';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import useStyles from '../../hooks/useStyles';

function UserCard({ provider }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
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
    location,
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

  return (
    <Card className={classes.cardRoot}>
      <CardContent className={classes.cardHeader}>
        <Typography variant="h6" display="inline" color="secondary">
          {first_name} {last_name}
        </Typography>{' '}
        <FavoriteProviderButton providerID={providers_users_id} />
        <br/>
        <Typography variant="caption">
          {parsePreferences('pronouns')}
          {write_in_pronouns && `, ${write_in_pronouns}`}
        </Typography>
      </CardContent>
      <CardMedia className={classes.cardMedia} image={pic} />
      <CardContent className={classes.cardContent}>
        <Typography variant="body2">
          <LocationOnIcon color="primary"/>{' '}{location}
        </Typography>
        <Typography variant="body2">
          <LanguageIcon color="primary"/>{' '}{parsePreferences('languages')}
        </Typography>
        <br/>
        {providerQuestions.map((question) => (
          // find method finds the question that the provider has an answer to
          <Typography key={question.id} variant="body2">
            <b>{question.content}</b>{' '}
            {
              questions?.find((answer) => question.id === answer.questions_id)
                ?.answer
            }
          </Typography>
        ))}
      </CardContent>
      <CardActions className={classes.cardButton}>
        <Button variant="contained" size="small" color="primary" onClick={sendToDetails}>
          Full Profile
        </Button>
      </CardActions>
    </Card>
  );
}

export default UserCard;
