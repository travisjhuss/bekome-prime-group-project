import UserCard from '../UserCard/UserCard'
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';



function ExploreView () {

    const dispatch = useDispatch();

    const providersReducer = useSelector((store) => store.exploreReducer)
    const questionsReducer = useSelector((store) => store.providerQuestions)
    let [providers, setProviders] = useState([])
    let [questions, setQuestions] = useState([])


    // Runs only on page load
    useEffect(() => {
        dispatch({ type: "GET_PROVIDERS" });
        dispatch({ type: "FETCH_PROVIDER_QUESTIONS"})
    }, []);


    // Runs when either providersReducer or questionsReducer change
    useEffect(() => {

        // this function sets the local state of providers and questions to allow cards to be rendered
        function setProviderState() {
            setProviders(providersReducer)
            setQuestions(questionsReducer)
        }

        // conditional that only runs function when data is properly recieved from BOTH reducers
        if (providersReducer[0]?.answers[0]?.providers_users_id !== undefined && questionsReducer[0]?.id !== undefined) {
            setProviderState();
        }

    }, [providersReducer, questionsReducer])


    return (
        <div>
            <Grid>
                {providers.map(provider => {
                    return (
                        <UserCard
                        key = {provider.providers_users_id}
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