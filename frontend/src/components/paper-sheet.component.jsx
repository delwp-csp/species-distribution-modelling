import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import EntryDetail from "./entry-detail.component"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    width: "100%"
  }
}))

export default function PaperSheet({ specieId }) {
  const classes = useStyles()

  return (
    <div>
      <Paper className={classes.root}>
        <EntryDetail specieId={specieId} />
      </Paper>
    </div>
  )
}
