import AdminPanelForm from './AdminPanelForm'
import useStyles from '../../hooks/useStyles'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';


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
    })


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
    }

    const handleInputs = (key) => (event) => {
        setNewPref({...newPref, [key]: event.target.value })
        console.log(newPref)
    };


    return (
        <div>
            <AdminPanelForm
            category="genders"
            filteredPreferences={genders}
            handleInputs={handleInputs}
            newPref={newPref}
            addPreference={addPreference}
            />
            <AdminPanelForm
            category="treatments"
            filteredPreferences={treatments}
            handleInputs={handleInputs}
            newPref={newPref}
            addPreference={addPreference}
            />
            <button onClick={() => console.log(newPref)}>test</button>
        </div>
    )
}

export default AdminPanel;