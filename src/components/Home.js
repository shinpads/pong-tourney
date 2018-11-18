import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import api from '../api';

const tableWidth = 5;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    }
  }
  async componentDidMount () {
    const data = await api.getData();
    console.log(data);
    const results = [];
    for (let i = 0; i < data.length; i += tableWidth) {
      if (!data[i].value) break;
      const players = [data[i].value, data[i+1].value];
      const game1 = data[i+2].value ? data[i+2].value.split('-').map(val => parseInt(val)) : [0, 0];
      const game2 = data[i+3].value ? data[i+3].value.split('-').map(val => parseInt(val)) : [0, 0];
      const game3 = data[i+4].value ? data[i+4].value.split('-').map(val => parseInt(val)) : [0, 0];
      const g1w = game1[0] > game1[1] ? 0 : 1;
      const g2w = game2[0] > game2[1] ? 0 : 1;
      const g3w = game3[0] > game3[1] ? 0 : 1;
      const winner = (g1 + g2 === 2) ? 1 : (g1 + g2 === 0) ? 0 : (g1 + g2 + g3 === 2) ? 1 : 0;
      results.push({
        players,
        game1,
        game2,
        game3,
        g1w,
        g2w,
        g3w,
        winner,
      });
    }
    results.reverse();
    this.setState({results});
  }

  render() {
    return (
      <div className="home-page" >
        <div style={{ width: '100%', height: '10px'}}/>
        <Paper className="standings">
          <TableHead>
            <TableCell numeric>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>GP</TableCell>
            <TableCell>W</TableCell>
            <TableCell>L</TableCell>
            <TableCell>gw</TableCell>
            <TableCell>gl</TableCell>
          </TableHead>
        </Paper>
        <div className="results-grid">
          {this.state.results.map((result) => {
            return (
              <Paper className="result-card">
                {result.players[0] + ' - ' + result.players[1]}
              </Paper>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
