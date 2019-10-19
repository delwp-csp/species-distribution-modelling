import React from "react"
import moment from "moment"
import EntryDetail from "./entry-detail.component"
import SimpleTable from "./table.component"
import PaperSheet from "./paper-sheet.component"
import "./report.styles.css"
import Button from "./button.component"
import superagent from "superagent"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"

import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

const STATUS_COLORS = { DONE: "green", FAILED: "red", RUNNING: "black" }

function StatusDisplay({ status }) {
  return <span style={{ color: STATUS_COLORS[status] }}>{status}</span>
}

function StepProgress({ step, now, children, runPredict }) {
  const time =
    step.status === "RUNNING" ? now - step.start : step.end - step.start
  const [showDetails, setShowDetails] = React.useState(false)
  return (
    <>
      <TableRow onClick={() => setShowDetails(!showDetails)}>
        <TableCell>{children}</TableCell>
        <TableCell>{Math.round(time / 100) / 10}s</TableCell>
        <TableCell>
          <StatusDisplay status={step.status} />
        </TableCell>
        <TableCell>
          {step.accuracy && Math.round(step.accuracy * 10000) / 100 + "%"}
        </TableCell>
      </TableRow>
      <TableRow
        onClick={() => setShowDetails(!showDetails)}
        style={{ display: showDetails ? "table-row" : "none" }}
      >
        <TableCell colSpan={4}>
          <div>
            <h2>Console Output</h2>
            {step.output &&
              step.output.map(line => (
                <pre style={{ color: line[0] === "stderr" ? "red" : "black" }}>
                  {line[1]}
                </pre>
              ))}
            <h2>Distribution Plot</h2>
            {step.distribution_plot && <img src={step.distribution_plot} />}
            {runPredict && (
              <Button onClick={runPredict} buttonText="Run predictions" />
            )}
          </div>
        </TableCell>
      </TableRow>
    </>
  )
}

class Report extends React.Component {
  constructor() {
    super()

    this.state = {
      entries: [],
      selectedRow: "none",
      tab: 0
    }
    this.processProgress = this.processProgress.bind(this)
  }

  fetchProgress() {
    superagent("get", `/progress/${this.props.match.params.specie_name}`).then(
      res => this.processProgress(res.body)
    )
  }

  componentDidMount() {
    //Placeholder json data
    this.fetchProgress()
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout)
  }

  processProgress(progress) {
    if (progress.status !== "DONE") {
      setTimeout(() => this.fetchProgress(), 2000)
    }

    this.setState({ progress })
  }

  render() {
    const { progress, tab } = this.state
    let entryDetail
    const specieName = this.props.match.params.specie_name

    const showComputations = tab === 2
    if (this.state.selectedRow != "none") {
      entryDetail = <PaperSheet specieId={this.state.selectedRow} />
    } else {
      entryDetail = <p></p>
    }

    return (
      <div className="report">
        <h1>Report</h1>
        <div className="button-container">
          <Button
            className="addButton"
            buttonText="Back"
            onClick={() => this.props.history.push("/")}
          />
        </div>
        <Tabs
          value={tab}
          onChange={(e, value) => this.setState({ tab: value })}
          aria-label="simple tabs example"
        >
          <Tab label="Models" />
          <Tab label="Predictions" />
          <Tab label="Log" />
        </Tabs>

        <div
          className="report-container"
          style={{ display: "flex", flexFlow: "row" }}
        >
          {!progress && <p>Fetching progress from server...</p>}
          {progress && tab === 1 && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Balancer / Model</TableCell>
                  <TableCell>Submitted at</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {progress.predict &&
                  Object.keys(progress.predict).map(k => {
                    const data = progress.predict[k]
                    const status = <StatusDisplay status={data.status} />
                    return (
                      <TableRow key={k}>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>
                          {data.balancer} / {data.model}
                        </TableCell>
                        <TableCell>
                          {moment(data.start).format("LLLL")}
                        </TableCell>
                        <TableCell>
                          {data.status === "DONE" ? (
                            <a
                              target="_blank"
                              href={`/predictions/${specieName}/${k}`}
                            >
                              {status}
                            </a>
                          ) : (
                            status
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          )}
          {progress && tab !== 1 && (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Step</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Accuracy</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {progress.preprocess &&
                    (showComputations ||
                      progress.preprocess.status !== "DONE") && (
                      <StepProgress
                        now={progress.now}
                        step={progress.preprocess}
                      >
                        Preprocess the dataset
                      </StepProgress>
                    )}
                  {progress.bal &&
                    Object.keys(progress.bal).map(bal => {
                      const data = progress.bal[bal]
                      return (
                        <>
                          {(showComputations ||
                            data.balance.status !== "DONE") && (
                            <StepProgress
                              now={progress.now}
                              step={data.balance}
                            >
                              Balancer: {bal} - Balancing
                            </StepProgress>
                          )}
                          {data.model &&
                            Object.keys(data.model).map(model => (
                              <StepProgress
                                now={progress.now}
                                step={data.model[model]}
                                runPredict={() =>
                                  (window.location.hash = `/predict/${specieName}/${bal}/${model}`)
                                }
                              >
                                <span
                                  style={{
                                    paddingLeft: showComputations
                                      ? "32px"
                                      : undefined
                                  }}
                                >
                                  Balancer: {bal}, Model Type: {model}
                                </span>
                              </StepProgress>
                            ))}
                        </>
                      )
                    })}
                </TableBody>
              </Table>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default Report
