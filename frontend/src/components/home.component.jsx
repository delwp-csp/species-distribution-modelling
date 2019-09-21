import React, { Component } from 'react';
import CardList from './card-list.component';
import AddButton from './button.component';
import './home.styles.css';
import superagent from 'superagent';
import { Card } from '@material-ui/core';


class Home extends Component {

  render() {
    
    return (
      <div className='home'>
        <h1 className='page-title'>DWELP Species Modelling</h1>
        <div className='button-container' onClick={() => this.props.history.push('/add-species')}>
          <AddButton className='addButton' buttonText='Add new species →' />
        </div>
        <CardList/>
      </div>
    )
  }




}


export default Home;
