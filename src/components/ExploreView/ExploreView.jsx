import UserCard from '../UserCard/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';



function ExploreView () {

    const dispatch = useDispatch();

    const providersReducer = useSelector((store) => store.exploreReducer)
    const questionsReducer = useSelector((store) => store.providerQuestions)


    // Runs only on page load
    useEffect(() => {
        dispatch({ type: "GET_PROVIDERS" });
        dispatch({ type: "FETCH_PROVIDER_QUESTIONS"})
    }, []);

    return (
        <div>
            <Grid>
                {providersReducer.map(provider => {
                    return (
                        <UserCard
                        key = {provider.providers_users_id}
                        provider = {provider}
                        questions = {questionsReducer}
                        favorited = {false}
                        />
                    )
                })}
            </Grid>
            <p>You made it to Explore View</p>
        </div>
    )
}

export default ExploreView;
