import {
    Modal,
    Typography,
    Button,
    Paper,
    Box,
    Grid
} from '@material-ui/core';
import useStyles from '../../hooks/useStyles';

function VideoModal({ modalState, setModalState, video }) {
    const classes = useStyles()

    const handleClose = () => {
        setModalState(false);
    }

    return (
        <Modal
        open={modalState}
        >
            <Box className={classes.videoModal}>
                <Grid container alignItems="center">
                    <Grid item>
                        <video controls>
                            <source src="http://techslides.com/demos/sample-videos/small.webm" type="video/webm" />
                        </video>
                    </Grid>
                </Grid>
                    <br/>
                    <Button
                    color="primary"
                    variant="contained"
                    onClick={handleClose}
                    >
                        Close
                    </Button>
            </Box>
        </Modal>
    )
}

export default VideoModal;