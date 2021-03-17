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
import useStyles from '../../hooks/useStyles';

function EditProviderQuestionsDialog({
  handleSubmit,
  dialogOpen,
  handleDialogs,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const providerAnswers = useSelector((store) => store.forms.providerAnswers);
  const providerQuestions = useSelector((store) => store.providerQuestions);

  const handleAnswer = (id) => (event) => {
    dispatch({
      type: 'SET_PROVIDER_RESPONSES',
      payload: { id, answer: event.target.value },
    });
  };

  const findValue = (id, type) => {
    const i = providerAnswers.questions.findIndex(
      (item) => item.questions_id === id
    );
    return type === 'answer'
      ? providerAnswers.questions[i]?.answer
      : providerAnswers.questions[i]?.displayed_on_card;
  };

  const handleDisplayOnCard = (id) => (event) => {
    event.stopPropagation();
    dispatch({
      type: 'SET_PROVIDER_RESPONSES',
      payload: { id, display: true },
    });
  };

  return (
    <Dialog
      open={dialogOpen.questions}
      onClose={() => handleDialogs('questions')}
    >
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
        <Button variant="contained" onClick={() => handleDialogs('questions')}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSubmit();
            handleDialogs('questions');
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProviderQuestionsDialog;
