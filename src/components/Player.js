import React, { Component } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { withRouter } from 'react-router-dom';

const Player = ({
  name,
  picture,
  history,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
    <div
      style={{
        width: '24px',
        height: '24px',
        overflow: 'hidden',
        borderRadius: '24px',
      }}
    >
      {window.playerPictures && window.playerPictures[name]
        ? <img src={window.playerPictures[name]} width={24} height={24}/>
        : <PersonIcon />
      }

    </div>
      <div
        style={{ marginLeft: '1rem', cursor: 'pointer' }}
        onClick={(e) => {
          history.push('/player/' + name);
        }}
      >
        {name}
      </div>
    </div>
  );
}

export default withRouter(Player);
