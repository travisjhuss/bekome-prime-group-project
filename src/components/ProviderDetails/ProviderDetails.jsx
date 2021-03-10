import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Paper, Box, Accordion, Typography } from '@material-ui/core';

function ProviderDetails() {
  const dispatch = useDispatch();
  const providerDetails = useSelector((store) => store.providerDetails);
  const providerQuestions = useSelector((store) => store.providerQuestions);
  const preferences = useSelector((store) => store.preferences);
  const { id } = useParams();

  useEffect(
    () => dispatch({ type: 'FETCH_PROVIDER_DETAILS', payload: id }),
    []
  );

  return (
    <Paper elevation={4}>
      <Typography>In Provider Details!</Typography>
    </Paper>
  );
}

export default ProviderDetails;
