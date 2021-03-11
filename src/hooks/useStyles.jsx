import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      margin: theme.spacing(4),
      padding: theme.spacing(3),
    },
    inputs: {
      margin: theme.spacing(2),
    },
    chips: {
      width: '12ch',
      margin: theme.spacing(0.5),
    },
  }));

export default useStyles;