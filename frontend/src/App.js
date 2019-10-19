/*
  App.js

  FIT3162 - Team 10 - Final Year Computer Science Project
  Copyright Luke Silva, Aichi Tsuchihira, Harsil Patel 2019

*/

import React from "react"
import Home from "./pages/home"
import AddSpecies from "./pages/add-species"
import Report from "./pages/report"
import Predict from "./pages/predict"
import { HashRouter, Switch, Route } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add-species" component={AddSpecies} />
          <Route path="/report/:specie_name" component={Report} />
          <Route
            path="/predict/:specie_name/:balancer/:model"
            component={Predict}
          />
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
