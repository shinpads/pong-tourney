import React, { Component } from 'react';
import api from '../api';
import Spinner from './Spinner';
import { Line } from 'react-chartjs-2';

class PlayerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      plusMinusData: [],
      labels: [],
    }
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
    await this.setState({ plusMinusData, labels });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Spinner />
      )
    }
    return (
      <div>
      <Line
        data={{
          labels: this.state.labels,
          datasets: [{
              label: '+/-',
              data: this.state.plusMinusData,
              borderWidth: 1
          }]
        }}
      />
        {this.props.match.params.playerName}
      </div>
    )
  }
}

export default PlayerPage;
