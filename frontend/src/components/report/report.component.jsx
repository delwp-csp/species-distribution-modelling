import React from 'react';

import Entry from '../entry/entry.component';

class Report extends React.Component {
  constructor() {
    super();

    this.state = {
      entries: [],

    }
  }

  componentDidMount() {
    //Placeholder json data
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then(response => response.json())
      .then(albums => this.setState({ entries: albums }));
  }

  handleChange(){
    console.log('clicked');
  }

  

  render() {
    return (
      <div className='report'>
        <h1>Report</h1>
        {this.state.entries.map(entry => (
          <Entry key={entry.id} entryId ={entry.id} userId ={entry.userId} reliability ={entry.title} />
          // <Entry key={entry.id} props={this.state.entries}/>
        ))}
      </div>
    );

  }


}

export default Report;