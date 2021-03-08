import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Box
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    button: {
        justifyContent: 'center'
    }
  });

function UserCard() {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardMedia
            className={classes.media}
            image="https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/10/Female_Therapist_1296x728-header-1-1296x728.jpg?w=1155&h=1528"
            />
            <CardContent>
                <Typography
                variant="h5"
                >
                    Janet Olveira
                </Typography>

                <Typography>
                    She / Her
                </Typography>

                <Typography>
                    St Paul, MN
                </Typography>

                <Typography>
                    English, Spanish
                </Typography>

                <Typography>
                <b>Three words my clients would use to describe me: </b>Action. Empathetic. Friend.
                </Typography>
                <Typography>
                <b>I resonate with and can help clients who: </b>grew up in small towns with big families, struggle with self-esteem and identiy
                </Typography>
                <Typography>
                <b>A quote that encompasses my approach as a therapist is: </b>‘Mental health is not a destination, but a process; it’s about how you drive, not where you’re going.”
                </Typography>
            </CardContent>
            <CardActions className={classes.button}>
                <Button size="small" color="primary">
                Full Profile
                </Button>
            </CardActions>
        </Card>
    )
}

export default UserCard;