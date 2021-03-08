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

function UserCard({provider, questions}) {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardMedia
            className={classes.media}
            image={provider.pic}
            />
            <CardContent>
                <Typography
                variant="h5"
                >
                    {provider.first_name + ' ' + provider.last_name}
                </Typography>

                <Typography>
                    {provider.pronouns}
                </Typography>

                <Typography>
                    {provider.location}
                </Typography>

                <Typography>
                    {provider.languages}
                </Typography>

                {provider.answers.map(answer => {
                    const questionObj = questions.find(element => element.id === answer.questions_id)
                    return (
                        <Typography>
                            {/* <b>{questions[0].content} </b> */}
                            {/* <b>{questions.find(q => q.id === answer.questions_id)}</b> */}
                            <b>{questionObj.content} </b>
                            {answer.answer}
                        </Typography>
                    )
                })}

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