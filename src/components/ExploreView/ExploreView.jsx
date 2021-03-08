import UserCard from '../UserCard/UserCard'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

function ExploreView () {
    return (
        <div>
            <Grid>
                <UserCard />
                <UserCard />
            </Grid>
            <p>You made it to Explore View</p>
        </div>
    )
}

export default ExploreView;