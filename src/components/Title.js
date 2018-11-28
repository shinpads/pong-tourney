import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import pongIcon from '../../public/pong.png';

const Title = ({}) => {
  return (
    <div style={{
        width: '100%',
        margin: 'auto',
        textAlign: 'center',
      }}>
      <div style={{
          fontFamily: "'Roboto', sans-serif",
          letterSpacing: '3px',
          fontWeight: '500',
          fontSize: '64px',
          color: '#ffffff',
          marginTop: '1rem',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textShadow: '1px 1px 2px black',
        }}>
        <Fade left>
          DOZR Pong
        </Fade>
        <Fade right>
          <div style={{
            marginLeft: '1.5rem',
            position: 'relative',
            top: '10px',
          }}>
            <img style={{ width: '64px', filter: 'invert(100%)', '-webkit-filter': 'invert(100%)' }} src={pongIcon} alt=""/>
            <img style={{ width: '64px', position: 'relative', left: '-65px', bottom: '1px' }} src={pongIcon} alt=""/>
          </div>
        </Fade>
      </div>
    </div>
  )
};

export default Title;
