import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Typography,
  TextField,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
// Custom hooks
import useStyles from '../../../hooks/useStyles';

// Opened by clicking the edit icon on QuestionAccordion
function EditProviderQuestionsDialog({
  handleSubmit,
  dialogOpen,
  handleCancel,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { questions } = useSelector((store) => store.forms.providerAnswers);
  const providerQuestions = useSelector((store) => store.providerQuestions);

  // Sends what is being typed alongside the question id to redux
  const handleAnswer = (id) => (event) => {
    dispatch({
      type: 'SET_PROVIDER_RESPONSES',
      payload: { id, answer: event.target.value },
    });
  };

  // Uses findIndex() to look through the 'questions' array of objects in redux
  // to find the matching question_id to the question being displayed
  const findValue = (id, type) => {
    const i = questions?.findIndex((item) => item.questions_id === id);
    if (i > -1) {
      return type === 'answer'
        ? questions[i].answer
        : questions[i].displayed_on_card;
    } else {
      return '';
    }
  };

  // Handles the checkbox of whether this question is pinned to the
  // provider's ProviderCard
  const handleDisplayOnCard = (id) => (event) => {
    // event.stopPropagation() keeps the MUI accordion from toggling open when
    // clicking the checkbox
    event.stopPropagation();
    dispatch({
      type: 'SET_PROVIDER_RESPONSES',
      payload: { id, display: true },
    });
  };

  return (
    <Dialog open={dialogOpen == 'questions'} onClose={handleCancel}>
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
              <Typography className={classes.accordionTitle}>
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
        <Button variant="contained" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProviderQuestionsDialog;
