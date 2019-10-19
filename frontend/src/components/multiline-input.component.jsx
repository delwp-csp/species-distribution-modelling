import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: 500
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 500
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}))

export default function MultiLineInput({ fieldName, ...props }) {
  const classes = useStyles()

  // const handleChange = name => event => {
  //   setValues({ ...values, [name]: event.target.value });
  // };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        label={fieldName}
        multiline
        rows="4"
        defaultValue=""
        className={classes.textField}
        margin="normal"
        variant="outlined"
        {...props}
      />
    </form>
  )
}
