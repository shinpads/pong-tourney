import React, { Component } from 'react';

import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import $ from 'jquery';

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
import UpcomingGameCard from './UpcomingGameCard';
import Spinner from './Spinner';

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
      upcomingGames: [],
      playerPictures: {},
      loading: true,
      isMobile: false,
    }
  }
  async componentDidMount () {
    const isMobile = window.innerWidth < 800;
    window.isMobile = isMobile;
    this.setState({ isMobile });
    $(window).resize(() => {
      const isMobile = window.innerWidth < 800;
      window.isMobile = isMobile;
      this.setState({ isMobile });
    })
    const { standings, schedule, playerPictures } = await api.getData();
    const results = [];
    const stats = {};
    for (let i = 0; i < standings.length; i += tableWidth) {
      if (!standings[i].value) break;
      const players = [standings[i].value, standings[i+1].value];
      const game1 = standings[i+2].value ? standings[i+2].value.split('-').map(val => parseInt(val)) : [0, 0];
      const game2 = standings[i+3].value ? standings[i+3].value.split('-').map(val => parseInt(val)) : [0, 0];
      const game3 = standings[i+4].value ? standings[i+4].value.split('-').map(val => parseInt(val)) : [0, 0];
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
      return stat;
    });

    const gamesPerDay = 5;
    const upcomingGames = [];

    for (let i = 0; i < schedule.length; i += gamesPerDay + 1) {
        let date = schedule[i].value;
        if (!date) break;
				let date2 = new Date(date);
				date2.setDate(date2.getDate() + 1);
				if (date2.getTime() < Date.now()) continue;
        for (let ii = i + 1; ii <= i + gamesPerDay; ii++) {
          if (schedule[ii].value) {
            upcomingGames.push({
              date,
              players: schedule[ii].value.split(',').map(p => p.trim()),
            });
          }
        }
    }
    console.log('pics', playerPictures);
    const playerPictureMap = {};
    for (let i = 0; i < playerPictures.length; i += 2) {
      let playerName = playerPictures[i].value.trim();
      if (!playerName) break;
      let playerPicture = playerPictures[i+1].value;
      if (playerPicture) {
        playerPictureMap[playerName] = playerPicture;
      }
    }
    window.playerPictures = playerPictureMap;
    this.setState({stats: statsList, upcomingGames, playerPictures: playerPictureMap, loading: false});
  }
  render() {
    if (this.state.loading) {
      return (
        <Spinner />
      )
    }
    const resultClasses = 'results-grid ' + (this.state.isMobile ? 'grid-1-col' : 'grid-2-col');
    return (
      <div className="home-page" >
        <div style={{
            width: '100%',
            margin: 'auto',
            textAlign: 'center',
          }}>
          <h1 style={{
              fontFamily: "'Roboto', sans-serif",
              letterSpacing: '3px',
              fontSize: '64px',
              color: '#e3d02c',
              marginTop: '1rem',
              marginBottom: '1rem',
            }}>
            DOZR Pong
          </h1>
        </div>
        <div style={{ width: '100%', height: '10px'}}/>
          <Fade><StandingsTable stats={this.state.stats}/></Fade>
        <div className="results-flex">
          <div className={resultClasses}>
            {this.state.results.map((result) => {
              return (
                <Flip bottom duration={500} delay={200}>
                  <GameCard key={result.players.join()} result={result}/>
                </Flip>
              );
            })}
          </div>
          <div className={resultClasses}>
            {this.state.upcomingGames.map((game) => {
              return (
                <Flip bottom duration={500}>
                  <UpcomingGameCard
                    key={game.players.join(game.date)}
                    date={game.date}
                    players={game.players}
                  />
                </Flip>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
