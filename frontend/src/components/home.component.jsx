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
        <h1 className='page-title'>DWELP Species Modelling</h1>
        <div className='button-container' onClick = {()=> this.props.history.push('/add-species')}>
          <AddButton className='addButton' buttonText='Add new species →' />
        </div>
        <CardList props = {this.props} species={this.state.species} />
      </div>
    )
  }




}


export default Home;
