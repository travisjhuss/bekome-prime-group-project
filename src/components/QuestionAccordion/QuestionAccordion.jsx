import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  IconButton,
  TextField,
  Button,
} from '@material-ui/core';
import { ExpandMore, Edit } from '@material-ui/icons';
import useStyles from '../../hooks/useStyles';

function QuestionAccordion({ edit }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const providerAnswers = useSelector((store) => store.forms.providerAnswers);
  const { questions } = useSelector((store) => store.providerDetails);
  const providerQuestions = useSelector((store) => store.providerQuestions);
  const [open, setOpen] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => dispatch({ type: 'FETCH_PROVIDER_QUESTIONS' }), []);

  const handleAnswer = (id) => (event) => {
    dispatch({
      type: 'SET_PROVIDER_RESPONSES',
      payload: { id, answer: event.target.value },
    });
  };

  const findValue = (id, type) => {
    const foundIndex = providerAnswers.questions.findIndex(
      (item) => item.questions_id === id
    );
    return type === 'answer'
      ? providerAnswers.questions[foundIndex]?.answer
      : providerAnswers.questions[foundIndex]?.displayed_on_card;
  };

  const handleDialog = (event) => {
    event.stopPropagation();
    setDialogOpen(true);
  };

  const handleDisplayOnCard = (id) => (event) => {
    event.stopPropagation();
    dispatch({ type: 'SET_DISPLAYED_QUESTIONS', payload: id });
  };

  return (
    <>
      <Accordion expanded={open} onChange={() => setOpen(!open)}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Questions</Typography>
          {edit && (
            <IconButton
              onClick={handleDialog}
              onFocus={(event) => event.stopPropagation()}
            >
              <Edit />
            </IconButton>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            {providerQuestions.map((item) => (
              <Typography key={item.id}>
                {item.content + ' '}
                {
                  questions?.find((answer) => item.id === answer.questions_id)
                    ?.answer
                }
              </Typography>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Edit Answers</DialogTitle>
        <DialogContent>
          {providerQuestions.map((item) => (
            <Accordion key={item.id}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Checkbox
                  checked={findValue(item.id, 'checked')}
                  onClick={handleDisplayOnCard(item.id)}
                  onFocus={(event) => event.stopPropagation()}
                />
                <Typography className={classes.questionTitle}>
                  {item.content}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  variant="outlined"
                  multiline
                  fullWidth
                  rows={3}
                  value={findValue(item.id, 'answer')}
                  onChange={handleAnswer(item.id)}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default QuestionAccordion;
