import useStyles from '../../hooks/useStyles'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
    Paper,
    TextField,
    Typography,
    Grid,
    IconButton,
    Button,
    List,
    ListItem,
    ListItemSecondaryAction
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
    // const [modalState, setModalState] = useState(false)
    // const [editState, setEditState] = useState({category: '', name: ''})

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

    // const openEditModal = (id) => {
    //     const selectedPreference = filteredPreferences.filter(pref => pref.id === id)
    //     setEditState({id: id, name: selectedPreference[0].name, category: category})
    //     setModalState(true)
    // }

    return (

        <>
            <List>
                {questions.map((question) => {
                    return (
                        <ListItem key={question.id}>
                            {question.content}
                            <ListItemSecondaryAction>
                                {/* <IconButton onClick={() => openEditModal(preference.id)}>
                                    <EditIcon />
                                </IconButton> */}
                                <IconButton onClick={() => deleteQuestion(question.id)}>
                                    <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
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
        </>
    )
}

export default AdminProviderQuestions