import { useState } from 'react'

import {
    Grid,
    Modal,
    Button,
    Typography,
    TextField,
} from '@material-ui/core';
import useStyles from '../../hooks/useStyles';


function AdminPanelEdit({ modalState, setModalState, editPref, setEditPref }) {
    const classes = useStyles()

    // const [editPref, setEditPref] = useState()

    const handleInputs = (event) => {
        setEditPref(event.target.value)
        console.log(editPref)
    };

    const handleSubmit = (dataToSend) => {
        addPreference(dataToSend);
        setEditPref('')
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
                value={editPref}
                />

                <Button onClick={() => {handleSubmit()}}>Submit</Button>


                <Button onClick={() => {setModalState(false)}}>close</Button>
            </div>
        </Modal>
    )
}

export default AdminPanelEdit;