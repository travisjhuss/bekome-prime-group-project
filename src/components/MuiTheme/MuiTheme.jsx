import { createMuiTheme } from '@material-ui/core/styles';

const font = "'Libre Baskerville', serif;";

const theme = createMuiTheme({
  typography: {
    fontFamily: font,
    body1: {
      fontFamily: 'Arial',
    },
    body2: {
      fontFamily: 'Arial',
    },
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: '#3D5A80',
    },
    secondary: {
      main: '#EE6C4D',
    },
  },
});

export default theme;
