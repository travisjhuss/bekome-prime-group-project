import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  Paper,
  Typography,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core';

function ClientInfoForm({ classes }) {
  const { id } = useParams();
  const currentPage = Number(id);
  const history = useHistory();
  const dispatch = useDispatch();
  const clientAnswers = useSelector((store) => store.forms.clientAnswers);

  const handleInputChange = (key) => (event) => {
    dispatch({
      type: 'SET_PERSONAL_DETAILS',
      payload: { key, value: event.target.value },
    });
  };

  return (
    <Paper className={classes.paper}>
      <TextField
        variant="outlined"
        label="First Name"
        className={classes.inputs}
        value={clientAnswers.first_name || ''}
        onChange={handleInputChange('first_name')}
      />
      <TextField
        variant="outlined"
        label="Last Name"
        className={classes.inputs}
        value={clientAnswers.last_name || ''}
        onChange={handleInputChange('last_name')}
      />
      <TextField
        variant="outlined"
        label="Pronouns"
        className={classes.inputs}
        value={clientAnswers.pronouns || ''}
        onChange={handleInputChange('pronouns')}
      />
      <TextField
        variant="outlined"
        label="Picture URL"
        className={classes.inputs}
        value={clientAnswers.pic || ''}
        onChange={handleInputChange('pic')}
      />
      <TextField
        variant="outlined"
        label="Date of Birth"
        className={classes.inputs}
        value={clientAnswers.date_of_birth || ''}
        onChange={handleInputChange('date_of_birth')}
      />
      <TextField
        variant="outlined"
        label="Location"
        className={classes.inputs}
        value={clientAnswers.location || ''}
        onChange={handleInputChange('location')}
      />
      <Button
        onClick={() => history.push(`/new-profile/${currentPage + 1}`)}
        variant="contained"
        color="primary"
      >
        Next
      </Button>
    </Paper>
  );
}

export default ClientInfoForm;
