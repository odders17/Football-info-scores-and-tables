import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#1c188f',
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

function createData(
  position,
  name,
  img,
  playedGames,
  won,
  draw,
  lost,
  points,
  goalsFor,
  goalsAgainst,
  goalDifference
) {
  return {
    position,
    name,
    img,
    playedGames,
    won,
    draw,
    lost,
    points,
    goalsFor,
    goalsAgainst,
    goalDifference
  };
}

const useStyles = makeStyles({
  tableContainer: {
    marginTop: '10px'
  },
  table: {
    minWidth: 500
  },
  avatar: { margin: '10px', border: 0, objectFit: 'cover', height: '100%' }
});

export default function LeagueTable(props) {
  const classes = useStyles();

  const rows = props.table.map(team =>
    createData(
      team.position,
      team.name,
      team.img,
      team.playedGames,
      team.won,
      team.draw,
      team.lost,
      team.points,
      team.goalsFor,
      team.goalsAgainst,
      team.goalDifference
    )
  );

  return (
    <>
      <Button
        style={{ marginTop: '10px' }}
        onClick={() => props.hideTable()}
        variant='contained'
        color='secondary'
      >
        Back To Leagues
      </Button>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table
          className={classes.table}
          size='small'
          aria-label='customized table'
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Position</StyledTableCell>
              <StyledTableCell align='right'>Badge</StyledTableCell>
              <StyledTableCell align='right'>Club</StyledTableCell>
              <StyledTableCell align='right'>Played</StyledTableCell>
              <StyledTableCell align='right'>Won</StyledTableCell>
              <StyledTableCell align='right'>Drawn</StyledTableCell>
              <StyledTableCell align='right'>Lost</StyledTableCell>
              <StyledTableCell align='right'>GF</StyledTableCell>
              <StyledTableCell align='right'>GA</StyledTableCell>
              <StyledTableCell align='right'>GD</StyledTableCell>
              <StyledTableCell align='right'>Points</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component='th' scope='row'>
                  {row.position}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  <Avatar
                    className={classes.avatar}
                    variant='rounded'
                    alt={row.name}
                    src={row.img}
                  />
                </StyledTableCell>
                <StyledTableCell align='right'>{row.name}</StyledTableCell>
                <StyledTableCell align='right'>
                  {row.playedGames}
                </StyledTableCell>
                <StyledTableCell align='right'>{row.won}</StyledTableCell>
                <StyledTableCell align='right'>{row.draw}</StyledTableCell>
                <StyledTableCell align='right'>{row.lost}</StyledTableCell>
                <StyledTableCell align='right'>{row.goalsFor}</StyledTableCell>
                <StyledTableCell align='right'>
                  {row.goalsAgainst}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {row.goalDifference}
                </StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold' }} align='right'>
                  {row.points}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}