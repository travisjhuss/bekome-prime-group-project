import { useSelector, useDispatch } from 'react-redux';
import { Paper, Typography, TextField, Grid } from '@material-ui/core';
// Custom hooks
import useStyles from '../../../hooks/useStyles';
// Components
import FormCheckboxes from '../../FormCheckboxes/FormCheckboxes';

function ClientForm2Reasons({ handleInputs }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const clientAnswers = useSelector((store) => store.forms.clientAnswers);

  const handleConnorData = () => {
    dispatch({
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: {
        key: 'primary_reason',
        value: `I've been feeling isolated during the past year, and could use somebody to talk to.`,
      },
    });
  };

  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography onClick={handleConnorData}>
            What is your primary reason for seeking therapy?
          </Typography>
          <TextField
            variant="outlined"
            label="Answer here"
            multiline
            fullWidth
            rows={4}
            className={classes.inputs}
            value={clientAnswers.primary_reason || ''}
            onChange={handleInputs('primary_reason')}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>What are you struggling with?</Typography>
          <FormCheckboxes category={'challenges'} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ClientForm2Reasons;
