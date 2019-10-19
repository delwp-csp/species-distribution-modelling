import React, { Component } from "react"
import CardList from "./card-list.component"
import AddButton from "./button.component"
import "./home.styles.css"
import superagent from "superagent"

class Home extends Component {
  constructor() {
    super()
    this.state = {
      serverRunning: true
    }
  }

  componentDidMount() {
    superagent("get", "./get_data").catch(err =>
      this.setState({ serverRunning: false })
    )
  }

  render() {
    if (this.state.serverRunning) {
      return (
        <div className="home">
          <h1 className="page-title">DWELP Species Modelling</h1>
          <div
            className="button-container"
            onClick={() => this.props.history.push("/add-species")}
          >
            <AddButton className="addButton" buttonText="Add new species →" />
          </div>
          <CardList />
        </div>
      )
    } else {
      return <h1>The server is not responding</h1>
    }
  }
}

export default Home
