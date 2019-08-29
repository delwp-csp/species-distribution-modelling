import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    padding:10,
    paddingLeft: 30,
    paddingRight: 30, 


  },
  input: {
    display: 'none',
  },
}));

export default function AddButton({buttonText}) {
  const classes = useStyles();

  return (
    <div>
      <Button variant="contained" color="primary" className={classes.button} >
        {buttonText}
      </Button>
    </div>
  );
}
