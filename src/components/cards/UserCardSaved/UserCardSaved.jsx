import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardActionArea,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Dialog,
  Box,
} from '@material-ui/core';
import { LocationOn, PlayCircleFilled } from '@material-ui/icons';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FavoriteProviderButton from '../../FavoriteProviderButton/FavoriteProviderButton';

function UserCardSaved({ provider }) {
  const {
    providers_users_id,
    pic,
    city,
    state,
    pronouns,
    first_name,
    last_name,
    video,
  } = provider;
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const sendToDetails = () => {
    history.push(`/provider-details/${provider.providers_users_id}`);
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <center>
      <Card className={classes.savedProviderCard} raised={true}>
        <CardActionArea onClick={sendToDetails}>
          <CardMedia className={classes.cardMedia} image={pic} />
        </CardActionArea>
        <CardHeader
          className={classes.cardHeader}
          action={
            <FavoriteProviderButton
              id={providers_users_id}
              saved={true}
              type={'GET_SAVED_PROVIDERS'}
            />
          }
          title={
            <Typography variant="h6" color="secondary">
              {first_name} {last_name}
            </Typography>
          }
          subheader={<Typography variant="body2">{pronouns}</Typography>}
        />
        <CardContent className={classes.savedUserCardsContent}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            pb={1}
          >
            <LocationOn className={classes.userCardIcons} color="primary" />
            <Typography variant="body2">
              {city}, {state}
            </Typography>
          </Box>
          {video && (
            <Button
              onClick={handleOpen}
              startIcon={<PlayCircleFilled color="secondary" />}
            >
              <Typography variant="body2">View Video</Typography>
            </Button>
          )}
        </CardContent>
        <CardActions className={classes.cardButton}>
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
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <video src={video} controls className={classes.video} />
      </Dialog>
    </center>
  );
}

export default UserCardSaved;
