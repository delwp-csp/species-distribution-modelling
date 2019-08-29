import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width:500,
    marginBottom:20,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width:500,
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

export default function InputField({fieldName}) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-name"
        label={fieldName}
        className={classes.textField}
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
        variant="outlined"
      />
    </form>
  );
}
