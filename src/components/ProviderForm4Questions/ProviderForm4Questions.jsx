import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Typography, TextField, Grid, Box } from '@material-ui/core';

function ProviderForm4Questions({ classes, handleInputs }) {
  const dispatch = useDispatch();
  const providerQuestions = useSelector((store) => store.providerQuestions);
  const providerAnswers = useSelector((store) => store.forms.providerAnswers);
  useEffect(() => dispatch({ type: 'FETCH_PROVIDER_QUESTIONS' }), []);

  const handleAnswer = (id) => (event) => {
    dispatch({
      type: 'SET_PROVIDER_RESPONSES',
      payload: { question_id: id, answer: event.target.value },
    });
  };

  return (
    <Paper className={classes.paper} elevation={4}>
      <Typography>Please answer the following questions:</Typography>
      {providerQuestions.map((item) => (
        <Box key={item.id}>
          <Typography>{item.content}</Typography>
          <TextField
            variant="outlined"
            multiline
            rows={3}
            value={
              providerAnswers.questions.find(
                (answer) => item.id === answer.question_id
              )?.answer || ''
            }
            onChange={handleAnswer(item.id)}
          />
        </Box>
      ))}
    </Paper>
  );
}

export default ProviderForm4Questions;
