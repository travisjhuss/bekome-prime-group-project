import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  Box,
} from '@material-ui/core';
import { LocationOn, Language, Edit } from '@material-ui/icons';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import ClientCard from '../../ClientCard/ClientCard';

function EditClient() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const client = useSelector((store) => store.forms.clientAnswers);

  useEffect(() => {
    dispatch({ type: 'FETCH_EDIT_CLIENT_PROFILE' });
    dispatch({ type: 'FETCH_PREFERENCES' });
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h6">Edit {client.first_name}'s Profile</Typography>
      <ClientCard client={client} />
    </Box>
  );
}

export default EditClient;
