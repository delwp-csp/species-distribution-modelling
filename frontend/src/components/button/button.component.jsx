import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './addButton.styles.css';


const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function AddButton() {
  const classes = useStyles();

  return (
    <div>
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon /> 
      </Fab>
    </div>
  );
}
