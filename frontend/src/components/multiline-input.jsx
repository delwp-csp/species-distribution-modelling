/*
  components/multiline-input.jsx

  FIT3162 - Team 10 - Final Year Computer Science Project
  Copyright Luke Silva, Aichi Tsuchihira, Harsil Patel 2019

*/

import React from "react"
import { makeStyles } from "@material-ui/core/styles"
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
