import { useState } from 'react';
import AdminPanelEdit from './AdminPanelEdit';

import {
  Paper,
  TextField,
  Typography,
  Grid,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from '../../hooks/useStyles';

function AdminPanelForm({
  category,
  filteredPreferences,
  addPreference,
  deletePreference,
  editPreference,
}) {
  const classes = useStyles();
  const [newPref, setNewPref] = useState('');
  const [modalState, setModalState] = useState(false);
  const [editState, setEditState] = useState({ category: '', name: '' });

  const handleInputs = (event) => {
    setNewPref(event.target.value);
  };

  const handleSubmit = (dataToSend) => {
    addPreference(dataToSend);
    setNewPref('');
  };

  const openEditModal = (id) => {
    const selectedPreference = filteredPreferences.filter(
      (pref) => pref.id === id
    );
    setEditState({
      id: id,
      name: selectedPreference[0].name,
      category: category,
    });
    setModalState(true);
  };

  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
      <AdminPanelEdit
        modalState={modalState}
        setModalState={setModalState}
        editState={editState}
        setEditState={setEditState}
        editPreference={editPreference}
      />

      <Paper className={classes.paper}>
        <Typography variant="h6">{category}</Typography>

        <List>
          {filteredPreferences.map((preference) => {
            return (
              <ListItem key={preference.id}>
                {preference.name}
                <ListItemSecondaryAction>
                  <IconButton onClick={() => openEditModal(preference.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deletePreference(preference.id)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        {category === 'age_ranges' && (
          <>
            <Typography variant="caption">
              note: formatting is 'xx-xx' or 'xx+' for age-range filters to work
              properly
            </Typography>
            <br />
          </>
        )}

        <form
          onSubmit={() => handleSubmit({ category: category, name: newPref })}
        >
          <TextField
            className={classes.inputs}
            variant="outlined"
            label="new preference"
            onChange={handleInputs}
            value={newPref}
          />

          <Button
            className={classes.adminPanelButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default AdminPanelForm;
