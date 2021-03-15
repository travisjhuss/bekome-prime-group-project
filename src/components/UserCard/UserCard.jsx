import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteProviderButton from '../FavoriteProviderButton/FavoriteProviderButton';
import {
  Card,
  CardActionArea,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from '@material-ui/core';
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
    location
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
      <CardHeader
        className={classes.cardHeader}
        title={
          <Typography variant="h5">
            {first_name} {last_name}
          </Typography>
        }
        subheader={
          <>
          <Typography>
            {parsePreferences('pronouns')}
            {write_in_pronouns && `, ${write_in_pronouns}`}
          </Typography>
          {' '}
          <Typography>
            {location}
          </Typography>
          </>
        }
      />
      <CardMedia className={classes.cardMedia} image={pic} />
      <CardContent>
        {/* <Typography>
          {parsePreferences('pronouns')}
          {write_in_pronouns && `, ${write_in_pronouns}`}
        </Typography> */}
        <FavoriteProviderButton providerID={providers_users_id} />
        {providerQuestions.map((question) => (
          // find method finds the question that the provider has an answer to
          <Typography key={question.id}>
            {question.content}{' '}
            {
              questions?.find((answer) => question.id === answer.questions_id)
                ?.answer
            }
          </Typography>
        ))}
      </CardContent>
      <CardActions className={classes.cardButton}>
        <Button size="small" color="primary" onClick={sendToDetails}>
          Full Profile
        </Button>
      </CardActions>
    </Card>
  );
}

export default UserCard;
