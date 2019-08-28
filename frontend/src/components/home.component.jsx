import React, { Component } from 'react';
import { CardList } from './card-list.component';
import AddButton from './button.component';
import './home.styles.css';
import data from '../species.json';


class Home extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      species: data

    }
  }


  render() {
    return (
      <div className='home'>
        <h1>DWELP Species Modelling</h1>
        <div className='button-container' onClick = {()=> this.props.history.push('/add-species')}>
          {console.log(this.props)}
          {/* <button onClick = {()=> this.props.history.push('/add-species')}>Button</button> */}
          <AddButton className='addButton'   />

          {/* <AddButton className='addButton' onClick={() => window.location.hash = `#/add`} /> */}
          {/* <Card onClick={() => window.location.hash = `#/report/${specie.id}`} key={specie.id} specie={specie} /> */}

        </div>
        <CardList species={this.state.species} />
      </div>
    )
  }




}


export default Home;
