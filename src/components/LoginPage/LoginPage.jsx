import React, { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Paper, Typography, Grid, Tab, Tabs } from '@material-ui/core';
import useStyles from '../../hooks/useStyles';

function LoginPage() {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  // function that controls what tab is selected and what to display based on the value of the tab state
  function TabPanel({ children, tab, index }) {
    return (
      <div
        role="tabpanel"
        hidden={tab !== index}
        id={`simple-tabpanel-${index}`}
      >
        {tab === index && <>{children}</>}
      </div>
    );
  }

  return (
    <div className={classes.centerContainer}>
      <Paper className={classes.loginContainer}>
        <Tabs
          value={tab}
          onChange={(event, value) => setTab(value)}
          indicatorColor="secondary"
          textColor="primary"
          variant="fullWidth"
        >
          {/* Labels for tabs */}
          <Tab label={<Typography>Sign Up</Typography>} />
          <Tab label={<Typography>Login</Typography>} />
        </Tabs>
        {/* TabPanels are the content of the tab itself with the index being the value of Tabs */}
        <Grid container align="center" spacing={1}>
          <Grid item xs={12} className={classes.loginForm}>
            <TabPanel tab={tab} index={0}>
              <RegisterForm />
            </TabPanel>
          </Grid>
          <Grid item xs={12} className={classes.loginForm}>
            <TabPanel tab={tab} index={1}>
              <LoginForm />
            </TabPanel>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default LoginPage;
