import React from 'react';
import EntryDetail from './entry-detail.component'
import SimpleTable from './table.component';
import PaperSheet from './paper-sheet.component'
import './report.styles.css'
import AddButton from './button.component'


class Report extends React.Component {
  constructor() {
    super();

    this.state = {
      entries: [],
      selectedRow: 'none'
    }
  }

  componentDidMount() {
    //Placeholder json data
    this.setState({
      entries: [
        { entryId: 1, userId: 1, reliability: 0.9 },
        { entryId: 2, userId: 1, reliability: 0.95 },
        { entryId: 3, userId: 2, reliability: 0.25 }
      ]
    })
  }

  handleChange() {
    console.log('clicked');
  }



  render() {
    let entryDetail;

    if (this.state.selectedRow != 'none') {
      entryDetail = <PaperSheet specieId={this.state.selectedRow} />
    } else {
      entryDetail = <p></p>
    }
    console.log(entryDetail);
    return (
      <div className='report'>
        <h1>Report</h1>
        <div className='button-container' onClick={() => this.props.history.push('/')}>
            <AddButton className='addButton' buttonText='Back' />
          </div>
        <div className='report-container' style={{ display: 'flex', flexFlow: 'row' }}>
          <SimpleTable selectRow={selectedRow => this.setState({ selectedRow })} entries={this.state.entries} />
          {/* <p>Hello {this.state.selectedRow}</p> */}
          <div className='entryDetail-container' style={{ width: '45%', }}>
            {entryDetail}
          </div>
        </div>


      </div>
    );

  }


}

export default Report;