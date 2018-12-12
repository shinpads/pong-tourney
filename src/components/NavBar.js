import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import pongIcon from '../../public/pong.png';
import dozrIcon from '../../public/dozr_logo.svg';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const materialTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#A7915F',
    },
  },
});

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  padded: {
    padding: '12px 6px',
  }
};

const NavBar = ({
  loginClicked,
  registerClicked,
  classes,
}) => {


  return (
    <MuiThemeProvider theme={materialTheme}>
      <div className={classes.root}>
        <AppBar position="static" className={classes.padded}>
          <Toolbar>
            <Typography variant="h4" color="secondary" className={classes.grow}>
              <img src={dozrIcon} style={{ marginRight: '0.7rem' }} />
               PONG
            </Typography>
            <Button color='secondary' onClick={loginClicked}>Login</Button>
            <Button color='secondary' onClick={registerClicked}>Register</Button>
          </Toolbar>
        </AppBar>
      </div>
    </MuiThemeProvider>

  )
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);