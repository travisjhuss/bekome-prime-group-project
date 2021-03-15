import AdminPanelForm from './AdminPanelForm'
import useStyles from '../../hooks/useStyles'
import { useEffect } from 'react'
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


    useEffect(() => {
        dispatch({type: 'FETCH_PREFERENCES'})
    }, []);


    return (
        <div>
            <AdminPanelForm
            category="gender"
            />
            <button onClick={() => console.log(genders)}>test</button>
        </div>
    )
}

export default AdminPanel;