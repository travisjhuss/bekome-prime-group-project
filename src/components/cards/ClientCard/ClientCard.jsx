import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import { LocationOn, Language, Edit } from '@material-ui/icons';
// Custom hooks
import useStyles from '../../../hooks/useStyles';

function ClientCard({ client, edit, setCardDialogOpen }) {
  const classes = useStyles();
  const {
    first_name,
    last_name,
    city,
    state,
    write_in_pronouns,
    pic,
    preferences_array,
    primary_reason,
  } = client;
  const preferences = useSelector((store) => store.preferences);

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

  return (
    <Card className={classes.clientCard}>
      <CardHeader
        title={
          <Typography variant="h6">
            {first_name} {last_name}
          </Typography>
        }
        subheader={
          <>
            {parsePreferences('pronouns')}
            {write_in_pronouns && `, ${write_in_pronouns}`}
          </>
        }
        action={
          edit && (
            <IconButton onClick={() => setCardDialogOpen(true)}>
              <Edit />
            </IconButton>
          )
        }
      />
      
      <CardMedia className={classes.cardMedia} image={pic} />
      <CardContent className={classes.CardContent}>
        <Typography variant="body2">
          <LocationOn color="primary" /> {city}, {state}
        </Typography>
        <Typography variant="body2">
          <Language color="primary" /> {parsePreferences('languages')}
        </Typography>
        <Typography variant="body2">
          <b>Primary reason for seeking therapy:</b>
        </Typography>
        <Typography variant="body2">{primary_reason}</Typography>
        <Typography variant="body2">
          <b>I'm struggling with:</b>
        </Typography>
        <Typography variant="body2">
          {parsePreferences('challenges')}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ClientCard;
