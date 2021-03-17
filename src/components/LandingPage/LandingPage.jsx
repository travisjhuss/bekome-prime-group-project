import React from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Typography} from '@material-ui/core';
import useStyles from '../../hooks/useStyles';
import './LandingPage.css';

function LandingPage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
    <div className="landing-grid">
      <img src="./skyhand.jpeg" className="landing-img" />
      <div className="landing-img-overlay">
        <Typography
          variant="h3"
          className={classes.landingTypography}
        >
          Reimagining mental health care for <u>you</u>.
        </Typography>
        <br/>
        <Typography
         variant="h5"
         className={classes.landingTypography}
        >
          The first digital mental health platform that sets you up for true success on your mental health journey.
        </Typography>
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

export default LandingPage;
