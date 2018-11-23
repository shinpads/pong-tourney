import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import colors from '../colors';
import Player from './Player';

const UpcomingGameCard = ({
  date,
  players,
}) => {
  return (
    <Paper className="upcoming-game-card">
      <div style={{ width: '100%', textAlign: 'right', fontWeight: '500' }}>
        {(new Date(date)).toDateString()}
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        {players.map((player) => {
          return (<Player name={player}/>);
        })}
      </div>
    </Paper>
  );
}

export default UpcomingGameCard;
