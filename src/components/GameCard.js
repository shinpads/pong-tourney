import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import colors from '../colors';
import Player from './Player';

const GameCard = ({
  result,
}) => {
  return (
    <Paper className="result-card">
      <div style={{ height: 'fit-content'}}>
        <div
          style={{
            fontWeight: result.winner === 0 ? 600 : 400,
            color: result.winner === 0 ? colors.winner : colors.loser,
            marginBottom: '0.5rem',
          }}
        >
          <Player name={result.players[0]} />
        </div>

        <div
          style={{
            fontWeight: result.winner === 1 ? 600 : 400,
            color: result.winner === 1 ? colors.winner : colors.loser
          }}
        >
          <Player name={result.players[1]} />
        </div>
      </div>
      <div style={{ margin: '0 auto', height: 'fit-content'}}>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              fontWeight: result.g1w === 0 ? 600 : 400,
              color: result.g1w === 0 ? colors.winner : colors.loser
            }}
          >
            {result.game1[0]}
          </div>

          <div style={{ marginLeft: '5px', marginRight: '5px' }}>-</div>

          <div
            style={{
              fontWeight: result.g1w === 1 ? 600 : 400,
              color: result.g1w === 1 ? colors.winner : colors.loser
            }}
          >
            {result.game1[1]}
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div
            style={{
              fontWeight: result.g2w === 0 ? 600 : 400,
              color: result.g2w === 0 ? colors.winner : colors.loser
            }}
          >
            {result.game2[0]}
          </div>

          <div style={{ marginLeft: '5px', marginRight: '5px' }}>-</div>

          <div
            style={{
              fontWeight: result.g2w === 1 ? 600 : 400,
              color: result.g2w === 1 ? colors.winner : colors.loser
            }}
          >
            {result.game2[1]}
          </div>
        </div>
        {
          result.isG3
          ? <div/>
          : (
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  fontWeight: result.g3w === 0 ? 600 : 400,
                  color: result.g3w === 0 ? colors.winner : colors.loser
                }}
              >
                {result.game3[0]}
              </div>

              <div style={{ marginLeft: '5px', marginRight: '5px' }}>-</div>

              <div
                style={{
                  fontWeight: result.g3w === 1 ? 600 : 400,
                  color: result.g3w === 1 ? colors.winner : colors.loser
                }}
              >
                {result.game3[1]}
              </div>
            </div>
          )
        }
      </div>
    </Paper>
  );
}

export default GameCard;
