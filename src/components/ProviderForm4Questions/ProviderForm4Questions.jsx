import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  Typography,
  TextField,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

function ProviderForm4Questions({ classes }) {
  const dispatch = useDispatch();
  const providerQuestions = useSelector((store) => store.providerQuestions);
  const providerAnswers = useSelector((store) => store.forms.providerAnswers);
  useEffect(() => dispatch({ type: 'FETCH_PROVIDER_QUESTIONS' }), []);

  const handleAnswer = (id) => (event) => {
    dispatch({
      type: 'SET_PROVIDER_RESPONSES',
      payload: { id, answer: event.target.value },
    });
  };

  const findValue = (id) => {
    const foundIndex = providerAnswers.questions.findIndex(
      (item) => item.id === id
    );
    return providerAnswers.questions[foundIndex]?.answer;
  };

  return (
    <Paper className={classes.paper} elevation={4}>
      <Typography>Please answer the following questions:</Typography>
      {providerQuestions.map((item) => (
        <Accordion key={item.id}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>{item.content}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              variant="outlined"
              multiline
              fullWidth
              rows={3}
              value={findValue(item.id)}
              onChange={handleAnswer(item.id)}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
}

export default ProviderForm4Questions;
