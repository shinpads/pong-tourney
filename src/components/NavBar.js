import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import pongIcon from '../../public/pong.png';
import dozrIcon from '../../public/dozr_logo.svg';
//<img style={{ width: '64px', position: 'relative', left: '-65px', bottom: '1px' }} src={pongIcon} alt=""/>

const NavBar = ({
  loginClicked,
  registerClicked,
}) => {
  return (
    <div className="nav-bar">
      <div style={{
          fontFamily: "'Roboto', sans-serif",
          fontWeight: '500',
          fontSize: '40px',
          color: '#ac9456',
          backgroundColor: '#000000',
          display: 'flex',
          marginLeft: '0.7rem',
        }}>
        <img src={dozrIcon} style={{ marginRight: '0.7rem' }} />
         PONG
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: '1rem',
      }}>
        <Button className="small-text-mobile" style={{ marginRight: '1rem', backgroundColor: '#ac9456', padding: '0px 12 px' }} variant="contained" onClick={registerClicked}>
          Register
        </Button>
        <Button className="small-text-mobile" style={{ backgroundColor: '#ac9456', padding: '0px 12px' }} variant="contained" color="#ac9456" onClick={loginClicked}>
          Login
        </Button>
      </div>
    </div>
  )
}

export default NavBar;
