import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: 500,
    marginBottom: 20
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

export default function InputField({ fieldName, ...props }) {
  const classes = useStyles()

  return (
    <div className={classes.container} noValidate autoComplete="off">
      <TextField
        label={fieldName}
        className={classes.textField}
        margin="normal"
        variant="outlined"
        {...props}
      />
    </div>
  )
}
