import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography, Grid } from '@material-ui/core';
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
        <Grid container spacing={2} className="how-it-works-flow">
          <Grid item xs={4} align="center" >
            <img src="./answer.png" className="how-it-works-icon" />
            <Typography variant="h6" color="secondary">
                Create a profile
            </Typography>
            <Typography className={classes.howWorksText}>
                Use our tools and guidance to understand and articulate your needs and preferences
            </Typography>
          </Grid>
          <Grid item xs={4} align="center" >
            <img src="./person-monitor.png" className="how-it-works-icon" />
            <Typography variant="h6" color="secondary">
                Choose your <i>right</i> provider
            </Typography>
            <Typography className={classes.howWorksText}>
                Our app allows you to find a list of providers matching your needs, and you have the power to choose your best fit
            </Typography>
          </Grid>
          <Grid item xs={4} align="center" >
            <img src="./handshake.png" className="how-it-works-icon" />
            <Typography variant="h6" color="secondary">
                Start your <i>right</i> care
            </Typography>
            <Typography className={classes.howWorksText}>
                Schedule, meet, and be equipped with the tools to bekome your best self right on this platform
            </Typography>
          </Grid>
        </Grid>
      </div>
      <center>
        <Button
          variant="contained"
          color="primary"
          className={classes.howWorksButton}
          onClick={() => history.push('/login')}
        >
          Get Started
        </Button>
      </center>
    </>
  );
}

export default HowItWorks;
