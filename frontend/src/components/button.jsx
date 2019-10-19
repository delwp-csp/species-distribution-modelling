/*
  components/button.jsx

  FIT3162 - Team 10 - Final Year Computer Science Project
  Copyright Luke Silva, Aichi Tsuchihira, Harsil Patel 2019

*/

import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#36A100",

    "&:hover": {
      backgroundColor: "Green"
    }
  },

  input: {
    display: "none"
  }
}))

export default function CustomButton({ buttonText, onClick }) {
  const classes = useStyles()

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  )
}
