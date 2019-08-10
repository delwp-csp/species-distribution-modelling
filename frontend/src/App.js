import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';

// function Heading({ children, color }) {
//   return <h1 style={{ color }}>{children}</h1>
// }

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      species: [
        {
          id: 1,
          name: 'Stylidium graminifolium',
          description: "Stylidium graminifolium, the grass triggerplant, is a dicotyledonous plant that belongs to the genus Stylidium (family Stylidiaceae). This species used to belong to the Stylidium graminifolium complex, but the name was conserved for this single species when two others were split from the complex and introduced as new species in 2001.",
          image: '../img/gramini.jpg'
        }

      ]

    }
  }


  render() {
    return (
      <div className='App'>
        <h1>DWELP Species Modelling</h1>
        <CardList species={this.state.species} />
      </div>
    )
  }

  componentDidMount() {
    // this.i = setInterval(() => this.setState({ n: this.state.n + 1 }), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.i)
  }
}





export default App;
