import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Paper, Box, Typography, makeStyles, Grid } from "@material-ui/core";

function InterestedClients() {
  // write a dispatch that calls saga to execute a GET route that gets clients that match provider in table named: clients_providers_favs
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const interestedClientsReducer = useSelector((store) => store.interestedClientsReducer);

  const { first_name, last_name, pic, primary_reason } = useSelector(
    (store) => store.interestedClientsReducer
  );

  // Runs only on page load
  useEffect(() => {
    dispatch({ type: "FETCH_INTERESTED_CLIENTS", payload: { user: user.id } });
  }, []);

  console.log(
    "sending this providers user id to the database to find matches on the favorites table:",
    user.id
  );
  console.log(interestedClientsReducer);

  return (
    <>
     <Box>
        <Typography>Interested</Typography>
        <Typography>{first_name}</Typography>
        <Typography>{last_name}</Typography>
        <Typography>{pic}</Typography>
        <Typography>{primary_reason}</Typography>
      </Box>
    </>

    //  <button onClick={() => console.log(interestedClientsReducer)}>Test</button>
  );
}

export default InterestedClients;
