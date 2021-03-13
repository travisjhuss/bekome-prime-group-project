import UserCardSaved from '../UserCardSaved/UserCardSaved'
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';



function SavedProviders () {

    const dispatch = useDispatch();

    const savedProvidersReducer = useSelector((store) => store.savedProviders)
    const questionsReducer = useSelector((store) => store.providerQuestions)

    // Runs only on page load
    useEffect(() => {
        dispatch({ type: "GET_SAVED_PROVIDERS" });
        dispatch({ type: "FETCH_PROVIDER_QUESTIONS"})
    }, []);

    return (
        <div>
            <Grid>
                {savedProvidersReducer.map(provider => {
                    return (
                        <UserCardSaved
                        key = {provider.providers_users_id}
                        provider = {provider}
                        questions = {questionsReducer}
                        favorited = {true}
                        />
                    )
                })}
            </Grid>
            {/* <button onClick={() => console.log(savedProvidersReducer)}>test</button> */}
        </div>
    )
}

export default SavedProviders;