import UserCard from '../UserCard/UserCard'
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';



function SavedProviders () {

    const dispatch = useDispatch();

    const savedProvidersReducer = useSelector((store) => store.savedProvidersReducer)
    const questionsReducer = useSelector((store) => store.providerQuestions)

    // Runs only on page load
    useEffect(() => {
        dispatch({ type: "GET_SAVED_PROVIDERS" });
        dispatch({ type: "FETCH_PROVIDER_QUESTIONS"})
    }, []);

    return (
        <div>
            <Grid>
                {/* {savedProvidersReducer.map(provider => {
                    return (
                        <UserCard
                        key = {provider.providers_users_id}
                        provider = {provider}
                        questions = {questionsReducer}
                        favorited = {true}
                        />
                    )
                })} */}
            </Grid>
        </div>
    )
}

export default SavedProviders;