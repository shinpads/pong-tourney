import React, { Component } from 'react';

// Material Design
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

const columns = [
  {id: 'rank', numeric: true, label: 'Rank', tooltip: 'Rank'},
  {id: 'name', numeric: false, label: 'Name', tooltip: 'Name'},
  {id: 'gp', numeric: true, label: 'MP', tooltip: 'Matches Played'},
  {id: 'w', numeric: true, label: 'W', tooltip: 'Match Wins'},
  {id: 'l', numeric: true, label: 'L', tooltip: 'Match Loses'},
  {id: 'gw', numeric: true, label: 'GW', tooltip: 'Game Wins'},
  {id: 'gl', numeric: true, label: 'GL', tooltip: 'Game Loses'},
  {id: 'pm', numeric: true, label: '+/-', tooltip: 'Point Differntial'},
];
const StandingsTable = ({
  stats,
}) => {
  return (
    <Paper className="standings">
      <TableHead>
        <TableRow>
          {columns.map((col) => {
            return (
              <TableCell
                key={col.id}
                numeric={col.numeric}
              >
                <Tooltip
                  title={col.tooltip}
                  placement='bottom-end'
                  enterDelay={300}
                >
                  <div>{col.label}</div>
                </Tooltip>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(stats).map((name) => {
          const stat = stats[name];
          return (
            <TableRow key={stat.name}>
              <TableCell numeric>0</TableCell>
              <TableCell>{stat.name}</TableCell>
              <TableCell numeric>{stat.gp}</TableCell>
              <TableCell numeric>{stat.w}</TableCell>
              <TableCell numeric>{stat.l}</TableCell>
              <TableCell numeric>{stat.gw}</TableCell>
              <TableCell numeric>{stat.gl}</TableCell>
              <TableCell numeric>{stat.pm}</TableCell>
            </TableRow>
          );
      })}
      </TableBody>
    </Paper>
  );
};

export default StandingsTable;
