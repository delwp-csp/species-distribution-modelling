import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import AddButton from './components/button/button.component';

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
          description: "Stylidium graminifolium, the grass triggerplant, is a dicotyledonous plant that belongs to the genus Stylidium (family Stylidiaceae). ", image: '../img/gramini.jpg'
        },
        {
          id: 2,
          name: 'Climacteris affinis',
          description: 'The White-browed Treecreeper (Climacteris affinis) is the smallest of the Australo-papuan Treecreepers and sole family member adapted to arid environments.', image: '../img/gramini.jpg'
        },
        {
          id: 3,
          name: 'Litoria ewingi',
          description: ' is a species of tree frog native to Australia: most of southern Victoria, eastern South Australia, southern New South Wales from about Ulladulla', image: '../img/gramini.jpg'
        }

      ]

    }
  }


  render() {
    return (
      <div className='App'>
        <h1>DWELP Species Modelling</h1>
        <AddButton />
        {/* <AddIcon /> */}
        <CardList species={this.state.species} />
      </div>
    )
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    clearInterval(this.i)
  }
}





export default App;
