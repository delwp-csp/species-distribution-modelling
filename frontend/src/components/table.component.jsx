import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '50%',
    // marginTop: theme.spacing(3),

    // overflowX: 'auto',
  },
  table: {
    minWidth: 650,
    padding: 30,
  },
  tableRow:{
    padding:100,
  },
  
  
}));

export default function SimpleTable({entries, selectRow}) {
  const classes = useStyles();
  // const rows = props;

  return (
    <Paper className={classes.root
    }>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Entry ID</TableCell>
            <TableCell align="left">User ID</TableCell>
            <TableCell align="left">Reliability</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map(row => (
            <TableRow className='entry' key={row.entryId} onClick={() => selectRow(row.entryId)}>
              <TableCell align="left">{row.entryId}</TableCell>
              <TableCell align="left">{row.userId}</TableCell>
              <TableCell align="left">{row.reliability}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
