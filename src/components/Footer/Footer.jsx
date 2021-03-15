import { Box, Typography } from '@material-ui/core';
import './Footer.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <Box className="footer">
      <Typography variant="body2" align="right" color="primary">
        &copy; bekome. 2021
      </Typography>
    </Box>
  );
}

export default Footer;
