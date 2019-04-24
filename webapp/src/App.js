import React from 'react';

function Heading({children, color}) {
  return <h1 style={{color}}>{children}</h1>
}

class TickTock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { n: 0 }
  }


  render() {
    return this.state.n
  }

  componentDidMount() {
    this.i = setInterval(()=>this.setState({n: this.state.n + 1}), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.i)
  }
}
  


function App() {
  return (
    <div>
      Test
      <Heading color="green">Hello</Heading>
      <p><TickTock/> seconds have passed since you loaded the page</p>
    </div>
  )
}

export default App;
