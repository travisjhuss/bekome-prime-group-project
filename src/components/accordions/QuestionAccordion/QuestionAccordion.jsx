import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@material-ui/core';
import { ExpandMore, Edit } from '@material-ui/icons';
import useStyles from '../../../hooks/useStyles';

// Displayed on ProviderDetails and EditProvider, if 'edit' prop is true,
// an edit icon is displayed which will open EditProviderQuestionsDialog
function QuestionAccordion({
  edit,
  setDialogOpen,
  openAccordion,
  handleOpenAccordion,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { questions } = useSelector((store) => store.providerDetails);
  const providerQuestions = useSelector((store) => store.providerQuestions);

  useEffect(() => dispatch({ type: 'FETCH_PROVIDER_QUESTIONS' }), []);

  return (
    <>
      <Accordion
        expanded={openAccordion === 'questions'}
        onChange={handleOpenAccordion('questions')}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6" className={classes.accordionTitle}>
            Questions
          </Typography>
          {edit && (
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                setDialogOpen('questions');
              }}
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
    </>
  );
}

export default QuestionAccordion;
