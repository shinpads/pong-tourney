import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';

import api from '../api';
import Spinner from './Spinner';
import { Line } from 'react-chartjs-2';
import Title from './Title';
import personIcon from '../../public/person.png'

class PlayerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      plusMinusData: [],
      labels: [],
      stats: {},
    }
    this.playerName = this.props.match.params.playerName;
  }

  async componentDidMount() {
    const { statsList, upcomingGames, playerPictureMap, results } = await api.getData();
    const playerName = this.props.match.params.playerName;
    const playerGames = results.filter((result) => result.players.indexOf(playerName) !== -1);
    playerGames.reverse();
    const labels = playerGames.map((x, i) => "Match " + i);
    const plusMinusData = [];
    playerGames.forEach((game) => {
      let last = 0;
      if (plusMinusData.length) last = plusMinusData[plusMinusData.length - 1];
      const index = game.players.indexOf(playerName);
      if (game.winner === index) plusMinusData.push(last + game.plusMinus);
      else plusMinusData.push(last - game.plusMinus);
    });
    console.log(playerGames);
    const stats = statsList[statsList.findIndex((stat) => stat.name === playerName)];
    console.log(stats);
    await this.setState({ plusMinusData, labels, stats });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Spinner />
      )
    }
    const stats = this.state.stats;
    return (
      <div style={{ padding: '5px' }}>
      <Paper style={{ marginBottom: '1rem'}}>
        <div style={{ padding: '10px', display: 'flex' }}>
          <img width={150} height={150} src={window.playerPictures[this.playerName] || personIcon} style={{ borderRadius: '150px', marginLeft: '1rem', marginRight: '2rem' }}/>
          <div style={{ paddingTop: '1rem', paddingBottom: '1rem', marginRight: '2rem' }}>
            {this.playerName}
          </div>
          <div style={{ paddingTop: '1rem', paddingBottom: '1rem', marginRight: '2rem' }}>
            <div>Rank: {stats.rank}</div>
          </div>
          <div style={{ paddingTop: '1rem', paddingBottom: '1rem', marginRight: '2rem' }}>
            <div>Matches Played: {stats.gp}</div>
            <div>Matches Won: {stats.w}</div>
            <div>Matches Lost: {stats.l}</div>
          </div>
          <div style={{ paddingTop: '1rem', paddingBottom: '1rem', marginRight: '2rem' }}>
            <div>+/-: {stats.pm}</div>
            <div>Games Won: {stats.gw}</div>
            <div>Games Lost: {stats.gl}</div>
          </div>
        </div>
      </Paper>
      <div style={{
        backgroundColor: '#FFF',
      }}>
        <Line
          data={{
            labels: this.state.labels,
            datasets: [{
                label: '+/-',
                data: this.state.plusMinusData,
                borderWidth: 1
            }]
          }}
          options={{
            scales: {
              yAxes: [{
                display: true,
                ticks: {
                  suggestedMin: -20,
                  suggestedMax: 20,
                }
              }]
            }
          }}
        />
      </div>
        {this.props.match.params.playerName}
      </div>
    )
  }
}

export default PlayerPage;
