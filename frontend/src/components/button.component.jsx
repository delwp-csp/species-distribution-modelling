import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function AddButton() {
  const classes = useStyles();

  return (
    <div>
      <Button variant="contained" color="primary" className={classes.button} >
        Add new species →
      </Button>
    </div>
  );
}
