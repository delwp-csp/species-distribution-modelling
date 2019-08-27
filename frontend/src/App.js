import React, { Component } from 'react';
import  Home  from './components/home/home.component';
import Add_Species from './components/Add_Species/add_species.component'

// function Heading({ children, color }) {
//   return <h1 style={{ color }}>{children}</h1>
// }

class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    // const currentPage = this.state.currentPage;

    // let Content = null;

    // switch(currentPage){
    //   case
    // }
    return (
      <div className='App'>
        <Home />
        {/* <Add_Species /> */}
      </div>
    )
  }

  componentDidMount() {

  }


}





export default App;
