import { useEffect, useState } from 'react';
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

function QuestionAccordion({ edit, handleDialogs }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { questions } = useSelector((store) => store.providerDetails);
  const providerQuestions = useSelector((store) => store.providerQuestions);
  const [open, setOpen] = useState(true);

  useEffect(() => dispatch({ type: 'FETCH_PROVIDER_QUESTIONS' }), []);

  return (
    <>
      <Accordion expanded={open} onChange={() => setOpen(!open)}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6" className={classes.accordionTitle}>
            Questions
          </Typography>
          {edit && (
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                handleDialogs('questions');
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
