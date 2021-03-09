import UserCard from '../UserCard/UserCard'
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';




const providers =
[
    {
        id: 1,
        first_name: 'Po',
        last_name: 'Stanley',
        pic: 'https://avatars.githubusercontent.com/u/70991031?s=400&u=f0374a68a807fdb079acde41e0a56fd44faa6691&v=4',
        video: 'sampledata',
        location: 'Wichita, KS',
        pronouns: 'He / Him',
        languages: 'English, Italian',
        answers: [
            {
                questions_id: 1,
                answer: 'I wanna help my fellow human.'
            },
            {
                questions_id: 2,
                answer: 'Pickle Ball',
            },
            {
                questions_id: 6,
                answer: 'Certified pickle ball instructor'
            }
        ]
    }
]

const questions =
[
    {
        id: 1,
        content: 'I became a therapist because...'
    },
    {
        id: 2,
        content: 'My favorite hobbies are...'
    },
    {
        id: 6,
        content: 'I have specialized training including...'
    }
]


function ExploreView () {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "GET_PROVIDERS" });
      }, []);


    return (
        <div>
            <Grid>
                {providers.map(provider => {
                    return (
                        <UserCard
                        key = {provider.id}
                        provider = {provider}
                        questions = {questions}
                        />
                    )
                })}
            </Grid>
            <p>You made it to Explore View</p>
        </div>
    )
}

export default ExploreView;