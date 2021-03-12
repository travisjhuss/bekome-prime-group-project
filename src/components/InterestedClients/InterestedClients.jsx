import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Paper, Box, Typography, makeStyles, Grid } from '@material-ui/core';



function InterestedClients() {

    // write a dispatch that calls saga to execute a GET route that gets clients that match provider in table named: clients_providers_favs
    const dispatch = useDispatch();


    const user = useSelector((store) => store.user);

    // Runs only on page load
      useEffect(() => {
        dispatch({ type: "FETCH_INTERESTED_CLIENTS", payload: {user: user.id},})
    }, []);


console.log('sending this providers user id to the database to find matches on the favorites table:', user.id)

    return (
        <h3>In Interested Clients</h3>
    )
}

export default InterestedClients;