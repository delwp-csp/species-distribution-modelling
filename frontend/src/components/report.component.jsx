  import React from 'react';
  import Entry from './entry.component';
  import SimpleTable from './table.component';
  import './report.styles.css'

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
      this.setState({entries: [
        {entryId: 1, userId: 1, reliability: 0.9},
        {entryId: 2, userId: 1, reliability: 0.95},
        {entryId: 3, userId: 2, reliability: 0.25}
      ]})
    }

    handleChange(){
      console.log('clicked');
    }

    

    render() {
      return (
        <div className='report'>
          <h1>Report</h1>
          {/* {this.state.entries.map(entry => (
            // <Entry key={entry.id} entryId ={entry.id} userId ={entry.userId} reliability ={entry.title} />
            <SimpleTable key={entry.id} entryId ={entry.id} userId ={entry.userId} reliability ={entry.title} />

            // <Entry key={entry.id} props={this.state.entries}/>
          ))} */}
          <div style={{display: 'flex', flexFlow: 'row'}}>

          <SimpleTable selectRow={selectedRow => this.setState({selectedRow})} entries={this.state.entries}/>
          <p>Hello {this.state.selectedRow}</p>
          </div> 

        </div>
      );

    }


  }

  export default Report;