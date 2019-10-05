import React from 'react';
import moment from 'moment'
import EntryDetail from './entry-detail.component'
import SimpleTable from './table.component';
import PaperSheet from './paper-sheet.component'
import './report.styles.css'
import AddButton from './button.component'
import superagent from 'superagent';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';

const STATUS_COLORS = { DONE: 'green', FAILED: 'red', RUNNING: 'black'}
function StepProgress({ step, now, children }) {
  const time = step.status === 'RUNNING' ? now - step.start : step.end - step.start
  const [showDetails, setShowDetails] = React.useState(false)
  return <>
  <TableRow onClick={() => setShowDetails(!showDetails)}>
    <TableCell>{children}</TableCell>
    <TableCell>{Math.round(time / 100) / 10}s</TableCell>
    <TableCell><span style={{color: STATUS_COLORS[step.status] }}>{step.status}</span></TableCell>
    <TableCell>{step.accuracy && Math.round(step.accuracy*10000)/100+'%'}</TableCell>
  </TableRow>
  <TableRow onClick={() => setShowDetails(!showDetails)} style={{ display: showDetails ? "table-row" : "none" }}>
    <TableCell colSpan={4}>
        <div>
          <h2>Console Output</h2>
          {step.output && step.output.map(line => <pre style={{color: line[0] === 'stderr' ? 'red': 'black'}}>{line[1]}</pre>)}
          <h2>Distribution Plot</h2>
          {step.distribution_plot && <img src={step.distribution_plot}/>}
        </div>
    </TableCell>
  </TableRow>
  </>
}

class Report extends React.Component {
  constructor() {
    super();

    this.state = {
      entries: [],
      selectedRow: 'none'
    }
    this.processProgress = this.processProgress.bind(this)
  }

  fetchProgress() {
    superagent('get', `/progress/${this.props.match.params.specie_name}`).then(res => this.processProgress(res.body))
  }

  componentDidMount() {
    //Placeholder json data
    this.fetchProgress()
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout)
  }

  processProgress(progress) {
    if (progress.status !== 'DONE') {
      setTimeout(() => this.fetchProgress(), 2000)
    }

    this.setState({ progress })
  }

  handleChange() {
    console.log('clicked');
  }



  render() {
    const { progress } = this.state
    let entryDetail;

    if (this.state.selectedRow != 'none') {
      entryDetail = <PaperSheet specieId={this.state.selectedRow} />
    } else {
      entryDetail = <p></p>
    }
    console.log(progress);

    return (
      <div className='report'>
        <h1>Report</h1>
        <div className='button-container' onClick={() => this.props.history.push('/')}>
          <AddButton className='addButton' buttonText='Back' />
        </div>
        <div className='report-container' style={{ display: 'flex', flexFlow: 'row' }}>
          {!progress && <p>Fetching progress from server...</p>}
          {progress && (
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
                  {progress.preprocess && (
                    <StepProgress now={progress.now} step={progress.preprocess}>
                      Preprocess the dataset
                    </StepProgress>
                  )}
                  {progress.bal && Object.keys(progress.bal).map(bal => {
                    const data = progress.bal[bal]
                    return (
                      <>
                        <StepProgress now={progress.now} step={data.balance}>
                          Balancer: {bal} - Balancing
                        </StepProgress>
                        {data.model && Object.keys(data.model).map(model => (
                          <StepProgress now={progress.now} step={data.model[model]}>
                            <span style={{paddingLeft:'32px'}}>Balancer: {bal}, Model Type: {model}</span>
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
    );

  }


}

export default Report;