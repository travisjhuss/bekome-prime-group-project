import AdminPanelForm from './AdminPanelForm'
import useStyles from '../../hooks/useStyles'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
    Grid,
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
        // uncomment next four lines if you'd like a form on the AdminPanel to edit the states in the database
        // {
        //     name: 'states',
        //     prefs: preferences.filter(pref => pref.category === 'states')
        // }
    ]

    useEffect(() => {
        dispatch({type: 'FETCH_PREFERENCES'})
    }, []);

    const addPreference = (preference) => {
        dispatch({
            type: 'ADD_NEW_PREFERENCE',
            payload:
                    {
                        name: preference.name,
                        category: preference.category
                    }
        })
        console.log('adding', preference)
    };

    const deletePreference = (id) => {
        console.log(id)
        dispatch({
            type: 'DELETE_PREFERENCE',
            payload: id
        })
    }

    const editPreference = (preference) => {
        console.log(preference)
        dispatch({
            type: 'EDIT_PREFERENCE',
            payload: preference
        })
    }


    return (
        <Grid container alignItems='baseline'>
            {prefArray.map((category) => {
                return (
                    <AdminPanelForm
                    category={category.name}
                    filteredPreferences={category.prefs}
                    addPreference={addPreference}
                    deletePreference={deletePreference}
                    editPreference={editPreference}
                    />
                )
            })}
        </Grid>

    )
}

export default AdminPanel;