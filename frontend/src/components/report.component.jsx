import React from 'react';

import Entry from './entry.component';
import SimpleTable from './table.component';

class Report extends React.Component {
  constructor() {
    super();

    this.state = {
      entries: [],

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

        <SimpleTable  entries={this.state.entries}/>
        {console.log(this.state.entries)}
      </div>
    );

  }


}

export default Report;