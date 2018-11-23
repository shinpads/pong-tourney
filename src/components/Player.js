import React, { Component } from 'react';
import PersonIcon from '@material-ui/icons/Person';

const Player = ({
  name,
  picture,
}) => {
  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      <PersonIcon />
      <div style={{ marginLeft: '1rem' }}>
        {name}
      </div>
    </div>
  );
}

export default Player;
