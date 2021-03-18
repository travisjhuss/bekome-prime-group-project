import useStyles from '../../hooks/useStyles'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import AdminQuestionsEdit from './AdminQuestionsEdit';
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
    Divider
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function AdminProviderQuestions() {
    const classes = useStyles()
    const dispatch = useDispatch();

    const questions = useSelector((store) => store.providerQuestions);

    useEffect(() => {
        dispatch({type: 'FETCH_PROVIDER_QUESTIONS'})
    }, []);

    const [newQuestion, setNewQuestion] = useState('')
    const [modalState, setModalState] = useState(false)
    const [editState, setEditState] = useState({content: ''})

    const handleInputs = (event) => {
        console.log(event.target.value)
        setNewQuestion(event.target.value)
    };

    const handleSubmit = () => {
        dispatch({
            type: 'ADD_NEW_QUESTION',
            payload: newQuestion
        })
        setNewQuestion('')
    }

    const deleteQuestion = (id) => {
        dispatch({
            type: 'DELETE_QUESTION',
            payload: id
        })
    }

    const editQuestion = (question) => {
        console.log(question)
        dispatch({
            type: 'EDIT_QUESTION',
            payload: question
        })
    }

    const openEditModal = (id) => {
        const selectedQuestion = questions.filter(question => question.id === id)
        setEditState({id: id, content: selectedQuestion[0].content})
        setModalState(true)
    }

    return (

        <Paper
        className={classes.questionsFormContainer}
        >
            <AdminQuestionsEdit
            modalState={modalState}
            setModalState={setModalState}
            editState={editState}
            setEditState={setEditState}
            editQuestion={editQuestion}
            />

            <List>
                {questions.map((question) => {
                    return (
                        <>
                        <ListItem key={question.id}>
                            {question.content}
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => openEditModal(question.id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => deleteQuestion(question.id)}>
                                    <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider  component="li" />
                        </>
                    )
                })}
            </List>

            <form onSubmit={handleSubmit}>
                <TextField
                    className={classes.inputs}
                    variant="outlined"
                    label="new question"
                    onChange={handleInputs}
                    value={newQuestion}
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
    )
}

export default AdminProviderQuestions