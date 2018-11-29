import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import pongIcon from '../../public/pong.png';
//<img style={{ width: '64px', position: 'relative', left: '-65px', bottom: '1px' }} src={pongIcon} alt=""/>
const NavBar = ({
  loginClicked,
}) => {
  return (
    <div className="nav-bar">
      <div style={{
          fontFamily: "'Roboto', sans-serif",
          letterSpacing: '3px',
          fontWeight: '500',
          fontSize: '40px',
          color: '#black',
          display: 'flex',
          marginLeft: '1rem',
        }}>
        DOZR Pong
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: '1rem',
      }}>
        <Button variant="contained" color="primary" onClick={loginClicked}>
          Login
        </Button>
      </div>
    </div>
  )
}

export default NavBar;
