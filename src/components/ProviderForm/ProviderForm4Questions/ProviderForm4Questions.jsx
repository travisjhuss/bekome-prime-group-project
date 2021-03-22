import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

function ProviderForm4Questions() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const providerQuestions = useSelector((store) => store.providerQuestions);
  const { questions } = useSelector((store) => store.forms.providerAnswers);
  const [openAccordion, setOpenAccordion] = useState(0);
  useEffect(() => dispatch({ type: 'FETCH_PROVIDER_QUESTIONS' }), []);

  const handleAnswer = (id) => (event) => {
    dispatch({
      type: 'SET_PROVIDER_RESPONSES',
      payload: { id, answer: event.target.value },
    });
  };

  const findValue = (id) => {
    const foundIndex = questions.findIndex((item) => item.questions_id === id);
    return questions[foundIndex]?.answer;
  };

  const handleOpenAccordion = (panel) => (event, isExpanded) => {
    setOpenAccordion(isExpanded ? panel : false);
  };

  const handleTravisData = (id) => {
    const whatAnswer =
      id === 1
        ? `I want to have a positive effect on the world, and therapy was the best way to use my gifts to achieve this.`
        : id === 2
        ? `Hanging out with my two dogs and cooking.`
        : id === 3
        ? `A 'no BS' attitude.`
        : '';

    dispatch({
      type: 'SET_PROVIDER_RESPONSES',
      payload: { id, answer: whatAnswer },
    });
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
            {findValue(item.id) && <DoneOutline color="primary" />}
          </AccordionSummary>
          <AccordionDetails onClick={() => handleTravisData(item.id)}>
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
