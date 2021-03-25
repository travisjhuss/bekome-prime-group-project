import { Modal, Button, Typography, TextField } from '@material-ui/core';
import useStyles from '../../hooks/useStyles';

function AdminPanelEdit({
  modalState,
  setModalState,
  editState,
  setEditState,
  editPreference,
}) {
  const classes = useStyles();

  const handleInputs = (event) => {
    setEditState({ ...editState, name: event.target.value });
  };

  const handleEditSubmit = (dataToSend) => {
    editPreference(dataToSend);
    setEditState({ name: '', category: '' });
    setModalState(false);
  };

  return (
    <Modal open={modalState}>
      <div className={classes.adminModal}>
        <form
          onSubmit={() => {
            handleEditSubmit(editState);
          }}
        >
          <TextField
            className={classes.adminModalInput}
            variant="outlined"
            label={'editing in ' + editState.category}
            onChange={handleInputs}
            value={editState.name}
            fullWidth
          />

          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </form>
        <br />
        <Button
          onClick={() => {
            setModalState(false);
          }}
          variant="outlined"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}

export default AdminPanelEdit;
