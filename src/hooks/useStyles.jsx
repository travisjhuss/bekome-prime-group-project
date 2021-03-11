import { makeStyles } from '@material-ui/core/styles';

// This hook will allow styling with MUI to be more consistent through components. 
// import with "import useStyles from '../../hooks/useStyles'" in a given component
// be sure to declare "const classes = useStyles()" before the return in a component
// ex. className={classes.paper} 

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