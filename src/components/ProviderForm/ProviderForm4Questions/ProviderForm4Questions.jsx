import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@material-ui/core';
import { ExpandMore, DoneOutline } from '@material-ui/icons';
// Custom hooks
import useStyles from '../../../hooks/useStyles';

// Part of provider stepper form, client can answer questions and add them to
// their 'questions' array
function ProviderForm4Questions() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const providerQuestions = useSelector((store) => store.providerQuestions);
  const { questions } = useSelector((store) => store.forms.providerAnswers);
  const [openAccordion, setOpenAccordion] = useState(0);
  useEffect(() => dispatch({ type: 'FETCH_PROVIDER_QUESTIONS' }), []);

  // Handles text inputs for questions in redux, id is the question id, answer
  // is what the user is typing
  const handleAnswer = (id) => (event) => {
    dispatch({
      type: 'SET_PROVIDER_RESPONSES',
      payload: { id, answer: event.target.value },
    });
  };

  // Finds the input answer for the displayed question from the user's redux,
  // if present
  const findValue = (id) => {
    const foundIndex = questions.findIndex((item) => item.questions_id === id);
    return questions[foundIndex]?.answer;
  };

  // Handles only one question accordion to be open at a time
  const handleOpenAccordion = (panel) => (event, isExpanded) => {
    setOpenAccordion(isExpanded ? panel : false);
  };

  return (
    <Paper className={classes.paper} elevation={4}>
      <Typography>
        <b>Please answer the following questions:</b>
      </Typography>
      {providerQuestions.map((item, i) => (
        <Accordion
          key={item.id}
          expanded={openAccordion === i}
          onChange={handleOpenAccordion(i)}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box flexGrow={1}>
              <Typography>
                <b>{item.content}</b>
              </Typography>
            </Box>
            {/* Displays a checkmark if user has filled out a question */}
            {findValue(item.id) && <DoneOutline color="primary" />}
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              className={classes.inputs}
              variant="outlined"
              multiline
              fullWidth
              rows={2}
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
