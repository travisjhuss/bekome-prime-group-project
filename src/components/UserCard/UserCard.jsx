import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FavoriteProviderButton from '../FavoriteProviderButton/FavoriteProviderButton';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '0px 20px',
  },
  media: {
    height: 300,
  },
  button: {
    justifyContent: 'center',
  },
});

function UserCard({ provider, questions, favorited }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const sendToDetails = () => {
    history.push(`/provider-details/${provider.providers_users_id}`);
  };

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={provider.pic} />
      <CardContent>
        <Typography variant="h5">
          {provider.first_name + ' ' + provider.last_name}
        </Typography>

        <Typography>{provider.pronouns}</Typography>

                <FavoriteProviderButton
                providerID = {provider.providers_users_id}
                favorited = {favorited}
                />

        <Typography>{provider.languages}</Typography>

        {provider.answers.map((answer) => {
          // find method finds the question that the provider has an answer to
          const questionObj = questions.find(
            (element) => element.id === answer.questions_id
          );
          return (
            <Typography key={answer.questions_id}>
              <b>{questionObj?.content} </b>
              {answer.answer}
            </Typography>
          );
        })}
      </CardContent>
      <CardActions className={classes.button}>
        <Button size="small" color="primary" onClick={sendToDetails}>
          Full Profile
        </Button>
      </CardActions>
    </Card>
  );
}

export default UserCard;
