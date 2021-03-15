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
import useStyles from '../../hooks/useStyles';

// dispatch on AdminPanel will get all rows from preferences table
// AdminPanelForm will get data from reducer for one category
// selected category will be prop sent down from AdminPanel
// AdminPanelForm will have a list display for GET route
// AdminPanelForm will have input and button for adding to list
// different dispatches for different categories?


function AdminPanelForm({category, filteredPreferences}) {
    const classes = useStyles()
    return (
        <Paper className={classes.paper}>
            <Typography variant="h6">
                {category}
            </Typography>

            <List>
                {filteredPreferences.map((preference) => {
                    return (
                        <ListItem key={preference.id}>
                            {preference.name}
                            <ListItemSecondaryAction>
                                <IconButton>
                                <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
            </List>

            <TextField
            className={classes.inputs}
            variant="outlined"
            label=""
            />

            <Button
            className={classes.adminPanelButton}
            // onClick={addRow}
            variant="contained"
            color="primary"
            >
                Add
            </Button>
        </Paper>
    )
}

export default AdminPanelForm;