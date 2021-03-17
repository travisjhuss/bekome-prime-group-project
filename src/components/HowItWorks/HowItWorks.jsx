import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import useStyles from '../../hooks/useStyles';
import './HowItWorks.css';

function HowItWorks() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <div className="how-it-works-grid">
        <img src="./woman-jumping2.jpg" className="how-it-works-img" />
        <div className="how-it-works-img-overlay">
          <Typography variant="h3" className={classes.landingTypography}>
            How it Works
          </Typography>
          <br />
          <Typography variant="h5" className={classes.landingTypography}>
            Simple like a dating app, just without the romance.
          </Typography>
        </div>
        <div className="how-it-works-flow">
            <img src="./answer.png" width="200"/>
            <img src="./person-monitor.png" width="200"/>
            <img src="./handshake.png" width="200"/>
        </div>
      </div>
      <center>
        <Button
          variant="contained"
          color="primary"
          className={classes.landingButton}
          onClick={() => history.push('/login')}
        >
          Get Started
        </Button>
      </center>
    </>
  );
}

export default HowItWorks;
