// This component is home to our theme settings for MUI components. It is imported into App.jsx and used through out the app itself
import { createMuiTheme } from '@material-ui/core/styles';

const font = "'Libre Baskerville', serif;";

const theme = createMuiTheme({
  typography: {
    fontFamily: font,
    subtitle2: {
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
    background: {
      default: '#fff',
    },
  },
});

export default theme;
