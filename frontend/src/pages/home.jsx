/*
  pages/home.jsx

  FIT3162 - Team 10 - Final Year Computer Science Project
  Copyright Luke Silva, Aichi Tsuchihira, Harsil Patel 2019

*/

import React, { Component } from "react"
import CardList from "../components/card-list"
import Button from "../components/button"
import "./home.css"
import superagent from "superagent"

class Home extends Component {
  constructor() {
    super()
    this.state = {
      species: [],
      serverRunning: true
    }
  }

  componentDidMount() {
    superagent("get", "./get_data")
      .then(data => this.setState({ species: data.body }))
      .catch(err =>
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
            <Button buttonText="Add new species →" />
          </div>
          <CardList speices={this.state.species}/>
        </div>
      )
    } else {
      return <h1>The server is not responding</h1>
    }
  }
}

export default Home
