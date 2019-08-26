import React, { Component } from 'react';
import { CardList } from '../card-list/card-list.component';
import AddButton from '../button/button.component';
import './home.styles.css';
import data from '../../species.json';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      species: data

    }
  }

  // componentDidMount() {
  //   //Placeholder json data
  //   fetch("../../species.json")
  //     .then(response => response.json())
  //     .then(species => this.setState({ species: species }))
  //     .then(console.log(this.state.species));
    
  // }


  render() {
    return (
      
      <div className='home'>
        <h1>DWELP Species Modelling</h1>
        <div style={{ textAlign: "right" }}>
          <AddButton className='addButton' />
        </div>
        <CardList species={this.state.species} />
      </div>
    )
  }




}


export default Home;
