import {
    Modal,
    Button,
    Typography,
    TextField,
} from '@material-ui/core';
import useStyles from '../../hooks/useStyles';


function AdminQuestionsEdit({ modalState, setModalState, editState, setEditState, editQuestion }) {
    const classes = useStyles()


    const handleInputs = (event) => {
        setEditState({...editState, content: event.target.value})
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();
        editQuestion(editState)
        setEditState({content:''})
        setModalState(false)
    }


    return (
        <Modal
        open={modalState}
        >
            <div className={classes.adminModal}>
                <Typography>

                </Typography>

                <form onSubmit={handleEditSubmit}>
                    <TextField
                    className={classes.adminModalInput}
                    variant="outlined"
                    label={"editing question"}
                    onChange={handleInputs}
                    value={editState.content}
                    fullWidth
                    />

                    <Button
                    type="submit"
                    variant="outlined"
                    >
                        Submit
                    </Button>
                </form>

                <br/>

                <Button
                onClick={() => {setModalState(false)}}
                variant="outlined"
                >
                    close
                </Button>
            </div>
        </Modal>
    )
}

export default AdminQuestionsEdit;