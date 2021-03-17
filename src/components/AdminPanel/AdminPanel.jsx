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

    const prefArray = [
        {
            name: 'treatments',
            prefs: preferences.filter(pref => pref.category === "treatments")
        },
        {
            name: 'genders',
            prefs: preferences.filter(pref => pref.category === "genders")
        },
        {
            name: 'qualities',
            prefs: preferences.filter(pref => pref.category === "qualities")
        },
        {
            name: 'religions',
            prefs: preferences.filter(pref => pref.category === "religions")
        },
        {
            name: 'ethnicities',
            prefs: preferences.filter(pref => pref.category === "ethnicities")
        },
        {
            name: 'challenges',
            prefs: preferences.filter(pref => pref.category === "challenges")
        },
        {
            name: 'languages',
            prefs: preferences.filter(pref => pref.category === "languages")
        },
        {
            name: 'sexual_orientations',
            prefs: preferences.filter(pref => pref.category === "sexual_orientations")
        },
        {
            name: 'age_ranges',
            prefs: preferences.filter(pref => pref.category === "age_ranges")
        },
        {
            name: 'formats',
            prefs: preferences.filter(pref => pref.category === "formats")
        },
        {
            name:'pronouns',
            prefs: preferences.filter(pref => pref.category === "pronouns")
        },
        {
            name: 'insurance',
            prefs: preferences.filter(pref => pref.category === 'insurance')
        },
        // uncomment next four lines if you'd like a form to edit the states in the database
        // {
        //     name: 'states',
        //     prefs: preferences.filter(pref => pref.category === 'states')
        // }
    ]

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
        dispatch({
            type: 'DELETE_PREFERENCE',
            payload: id
        })
    }

    const editPreference = (id) => {
        console.log(id)
        setModalState(true)
    }

    const handleInputs = (key) => (event) => {
        setNewPref({...newPref, [key]: event.target.value })
        // console.log(newPref)
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
                {prefArray.map((category) => {
                    return (
                        <AdminPanelForm
                        category={category.name}
                        filteredPreferences={category.prefs}
                        handleInputs={handleInputs}
                        newPref={newPref[category]}
                        addPreference={addPreference}
                        deletePreference={deletePreference}
                        editPreference={editPreference}
                        />
                    )
                })}
            </Grid>
        </>

    )
}

export default AdminPanel;