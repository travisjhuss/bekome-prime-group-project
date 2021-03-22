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

function EditProviderQuestionsDialog({
  handleSubmit,
  dialogOpen,
  handleCancel,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { questions } = useSelector((store) => store.forms.providerAnswers);
  const providerQuestions = useSelector((store) => store.providerQuestions);

  const handleAnswer = (id) => (event) => {
    dispatch({
      type: 'SET_PROVIDER_RESPONSES',
      payload: { id, answer: event.target.value },
    });
  };

  const findValue = (id, type) => {
    const i = questions.findIndex((item) => item.questions_id === id);
    return type === 'answer'
      ? questions[i]?.answer
      : questions[i]?.displayed_on_card;
  };

  const handleDisplayOnCard = (id) => (event) => {
    event.stopPropagation();
    dispatch({
      type: 'SET_PROVIDER_RESPONSES',
      payload: { id, display: true },
    });
  };

  const handlePoData = (id) => {
    const whatAnswer =
      questions.find((item) => item.questions_id === 4).answer ===
      `People who have grown up with family members dealing with substance abuse.`
        ? `People struggling with work/life balance.`
        : `People who have grown up with family members dealing with substance abuse.`;
    if (id === 4) {
      dispatch({
        type: 'SET_PROVIDER_RESPONSES',
        payload: {
          id: 4,
          answer: whatAnswer,
        },
      });
    }
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
            <AccordionDetails onClick={() => handlePoData(item.id)}>
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
