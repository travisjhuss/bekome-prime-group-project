import { useState } from 'react'

import {
    Grid,
    Modal,
    Button,
    Typography,
    TextField,
} from '@material-ui/core';
import useStyles from '../../hooks/useStyles';


function AdminPanelEdit({ modalState, setModalState, editState, setEditState, editPreference }) {
    const classes = useStyles()


    const handleInputs = (event) => {
        setEditState(event.target.value)
    };

    const handleEditSubmit = (dataToSend) => {
        console.log(dataToSend)
        editPreference(dataToSend)
        setEditState({name:'', category: ''})
        setModalState(false)
    }


    return (
        <Modal
        open={modalState}
        >
            <div className={classes.adminModal}>
                <Typography>

                </Typography>

                <TextField
                className={classes.inputs}
                variant="outlined"
                label="edit preference"
                onChange={handleInputs}
                value={editState.name}
                />

                <Button onClick={() => {handleEditSubmit({id: editState.id, category: editState.category, name: editState.name})}}>
                    Submit
                </Button>

                <Button onClick={() => {setModalState(false)}}>close</Button>
            </div>
        </Modal>
    )
}

export default AdminPanelEdit;