import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Accordion } from '@material-ui/core';

function QuestionAccordion() {
  const dispatch = useDispatch();
  const { questions } = useSelector((store) => store.providerDetails);
  const providerQuestions = useSelector((store) => store.providerQuestions);
  const [open, setOpen] = useState(true);

  useEffect(() => dispatch({ type: 'FETCH_PROVIDER_QUESTIONS' }), []);

  return <p>Question Accordion</p>;
}

export default QuestionAccordion;
