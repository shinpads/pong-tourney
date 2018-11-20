import React, { Component } from 'react';

// Material Design
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Custom Components
import GameCard from './GameCard';
import StandingsTable from './StandingsTable';

// other
import api from '../api';
import colors from '../colors';


const tableWidth = 5;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      stats: [],
    }
  }
  async componentDidMount () {
    const data = await api.getData();
    const results = [];
    const stats = {};
    for (let i = 0; i < data.length; i += tableWidth) {
      if (!data[i].value) break;
      const players = [data[i].value, data[i+1].value];
      const game1 = data[i+2].value ? data[i+2].value.split('-').map(val => parseInt(val)) : [0, 0];
      const game2 = data[i+3].value ? data[i+3].value.split('-').map(val => parseInt(val)) : [0, 0];
      const game3 = data[i+4].value ? data[i+4].value.split('-').map(val => parseInt(val)) : [0, 0];
      const g1w = game1[0] > game1[1] ? 0 : 1;
      const g2w = game2[0] > game2[1] ? 0 : 1;
      const g3w = game3[0] > game3[1] ? 0 : 1;
      const isG3 = game3[0] === game3[1];
      const winner = (g1w + g2w === 2) ? 1 : (g1w + g2w === 0) ? 0 : (g1w + g2w + g3w === 2) ? 1 : 0;
      const plusMinus = Math.abs((game1[0] - game1[1]) + (game2[0] - game2[1]) + (game3[0] - game3[1]));
      results.push({
        players,
        game1,
        game2,
        game3,
        g1w,
        g2w,
        g3w,
        isG3,
        winner,
        plusMinus
      });

      const wName = players[winner];
      const lName = players[1 - winner];

      if (!stats[wName]) {
        stats[wName] = {
          name: wName,
          gp: 0,
          w: 0,
          l: 0,
          gw: 0,
          gl: 0,
          pm: 0,
        };
      }
      if (!stats[lName]) {
        stats[lName] = {
          name: lName,
          gp: 0,
          w: 0,
          l: 0,
          gw: 0,
          gl: 0,
          pm: 0,
        };
      }

      stats[wName].gp++;
      stats[lName].gp++;

      stats[wName].w++;
      stats[lName].l++;

      stats[wName].gw += 2;
      stats[lName].gw += g1w !== g2w ? 1 : 0;

      stats[wName].gl += g1w !== g2w ? 1 : 0;
      stats[lName].gl += 2;

      stats[wName].pm += plusMinus;
      stats[lName].pm -= plusMinus;

    }
    results.reverse();
    this.setState({results});

    let statsList = Object.keys(stats).map(name => stats[name]);
    statsList.sort((a, b) => {
      if (a.w !== b.w) return b.w - a.w;
      if (a.gw !== b.gw) return b.gw - a.gw;
      if (a.gl !== b.gl) return a.gl - b.gl;
      if (a.pm !== b.pm) return b.pm - a.pm;
      if (a.l !== b.l) return a.l - b.l;
      if (a.mp !== b.mp) return a.mp - b.mp;
      return -1;
    });

    statsList = statsList.map((stat, index) => {
      stat.rank = index + 1;
      console.log(stat);
      return stat;
    });

    this.setState({stats: statsList});
  }

  render() {
    return (
      <div className="home-page" >
        <div style={{
            width: '100%',
            margin: 'auto',
            textAlign: 'center',
          }}>
          <h1 style={{
              fontFamily: "'Anton', sans-serif",
              letterSpacing: '3px',
              fontSize: '64px',
              color: '#acb20c',
            }}>
            DOZR Pong Tourny.net
          </h1>
        </div>
        <div style={{ width: '100%', height: '10px'}}/>
        <div className="standings-table">
          <StandingsTable stats={this.state.stats}/>
        </div>
        <div className="results-grid">
          {this.state.results.map((result) => {
            return (
              <GameCard key={result.players.join()} result={result}/>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
