import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

function QuestionAccordion() {
  const dispatch = useDispatch();
  const { questions } = useSelector((store) => store.providerDetails);
  const providerQuestions = useSelector((store) => store.providerQuestions);
  const [open, setOpen] = useState(true);

  useEffect(() => dispatch({ type: 'FETCH_PROVIDER_QUESTIONS' }), []);

  return (
    <Accordion expanded={open} onChange={() => setOpen(!open)}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">Questions</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {providerQuestions.map((item) => (
            <>
              <Typography>
                {item.content + ' '}
                {
                  questions?.find((answer) => item.id === answer.questions_id)
                    ?.answer
                }
              </Typography>
            </>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default QuestionAccordion;
