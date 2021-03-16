import AdminPanelForm from './AdminPanelForm'
import useStyles from '../../hooks/useStyles'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
    Grid,
    Modal,
    Button,
    Typography
} from '@material-ui/core';


function AdminPanel() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const preferences = useSelector((store) => store.preferences);

    const treatments = preferences.filter(pref => pref.category === "treatments")
    const genders = preferences.filter(pref => pref.category === "genders")
    const qualities = preferences.filter(pref => pref.category === "qualities")
    const religions = preferences.filter(pref => pref.category === "religions")
    const ethnicities = preferences.filter(pref => pref.category === "ethnicities")
    const challenges = preferences.filter(pref => pref.category === "challenges")
    const languages = preferences.filter(pref => pref.category === "languages")
    const sexual_orientations = preferences.filter(pref => pref.category === "sexual_orientations")
    const age_ranges = preferences.filter(pref => pref.category === "age_ranges")
    const formats = preferences.filter(pref => pref.category === "formats")
    const pronouns = preferences.filter(pref => pref.category === "pronouns")

    const [newPref, setNewPref] = useState({
        treatments: '',
        genders: '',
        qualities: '',
        religions: '',
        ethnicities: '',
        challenges: '',
        languages: '',
        sexual_orientations: '',
        age_ranges: '',
        formats: '',
        pronouns: ''
    });

    const [modalState, setModalState] = useState(false)


    useEffect(() => {
        dispatch({type: 'FETCH_PREFERENCES'})
    }, []);

    const addPreference = (category) => (event) => {
        dispatch({
            type: 'ADD_NEW_PREFERENCE',
            payload:
                    {
                        name: newPref[category],
                        category: category
                    }
        })
        console.log('adding', category)
        setNewPref({...newPref, [category]: ''})
    };

    const deletePreference = (id) => {
        console.log(id)
    }

    const editPreference = (id) => {
        console.log(id)
        setModalState(true)
    }

    const handleInputs = (key) => (event) => {
        setNewPref({...newPref, [key]: event.target.value })
        console.log(newPref)
    };


    return (
        <>

            <Modal
            open={modalState}
            >
                <div className={classes.adminModal}>
                    <Typography>

                    </Typography>
                    <Button onClick={() => {setModalState(false)}}>close</Button>
                </div>
            </Modal>

            <Grid container alignItems='baseline'>
                <AdminPanelForm
                category="genders"
                filteredPreferences={genders}
                handleInputs={handleInputs}
                newPref={newPref}
                addPreference={addPreference}
                deletePreference={deletePreference}
                editPreference={editPreference}
                />
                <AdminPanelForm
                category="treatments"
                filteredPreferences={treatments}
                handleInputs={handleInputs}
                newPref={newPref}
                addPreference={addPreference}
                deletePreference={deletePreference}
                editPreference={editPreference}
                />
                <AdminPanelForm
                category="qualities"
                filteredPreferences={qualities}
                handleInputs={handleInputs}
                newPref={newPref}
                addPreference={addPreference}
                deletePreference={deletePreference}
                editPreference={editPreference}
                />
                <AdminPanelForm
                category="religions"
                filteredPreferences={religions}
                handleInputs={handleInputs}
                newPref={newPref}
                addPreference={addPreference}
                deletePreference={deletePreference}
                editPreference={editPreference}
                />
                <AdminPanelForm
                category="ethnicities"
                filteredPreferences={ethnicities}
                handleInputs={handleInputs}
                newPref={newPref}
                addPreference={addPreference}
                deletePreference={deletePreference}
                editPreference={editPreference}
                />
                <AdminPanelForm
                category="challenges"
                filteredPreferences={challenges}
                handleInputs={handleInputs}
                newPref={newPref}
                addPreference={addPreference}
                deletePreference={deletePreference}
                editPreference={editPreference}
                />
                <AdminPanelForm
                category="languages"
                filteredPreferences={languages}
                handleInputs={handleInputs}
                newPref={newPref}
                addPreference={addPreference}
                deletePreference={deletePreference}
                editPreference={editPreference}
                />
                <AdminPanelForm
                category="sexual_orientations"
                filteredPreferences={sexual_orientations}
                handleInputs={handleInputs}
                newPref={newPref}
                addPreference={addPreference}
                deletePreference={deletePreference}
                editPreference={editPreference}
                />
                <AdminPanelForm
                category="age_ranges"
                filteredPreferences={age_ranges}
                handleInputs={handleInputs}
                newPref={newPref}
                addPreference={addPreference}
                deletePreference={deletePreference}
                editPreference={editPreference}
                notes={"make sure formatting is 'xx-xx' or 'xx+' for filters to work properly"}
                />
                <AdminPanelForm
                category="pronouns"
                filteredPreferences={pronouns}
                handleInputs={handleInputs}
                newPref={newPref}
                addPreference={addPreference}
                deletePreference={deletePreference}
                editPreference={editPreference}
                />
                <AdminPanelForm
                category="formats"
                filteredPreferences={formats}
                handleInputs={handleInputs}
                newPref={newPref}
                addPreference={addPreference}
                deletePreference={deletePreference}
                editPreference={editPreference}
                />
                {/* <button onClick={() => console.log(newPref)}>test</button> */}
            </Grid>
        </>

    )
}

export default AdminPanel;