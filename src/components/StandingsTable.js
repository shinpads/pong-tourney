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
import { createStyles } from '@material-ui/core/styles';

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
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => {
              return (
                <TableCell
                  key={col.id}
                  numeric={col.numeric}
                  className="standings-table-cell"
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
          {stats.map((stat) => {
            return (
              <TableRow key={stat.name}>
                <TableCell className="standings-table-cell" numeric>{stat.rank}</TableCell>
                <TableCell className="standings-table-cell">{stat.name}</TableCell>
                <TableCell className="standings-table-cell" numeric>{stat.gp}</TableCell>
                <TableCell className="standings-table-cell" numeric>{stat.w}</TableCell>
                <TableCell className="standings-table-cell" numeric>{stat.l}</TableCell>
                <TableCell className="standings-table-cell" numeric>{stat.gw}</TableCell>
                <TableCell className="standings-table-cell" numeric>{stat.gl}</TableCell>
                <TableCell className="standings-table-cell" numeric>{stat.pm}</TableCell>
              </TableRow>
            );
        })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default StandingsTable;
