/*
  components/card-list.jsx

  FIT3162 - Team 10 - Final Year Computer Science Project
  Copyright Luke Silva, Aichi Tsuchihira, Harsil Patel 2019

  This component renders a grid of cards for each specie that has been added to
  the project, and allows the user to select one.
*/

import React from "react"
import "./card-list.css"
import { Card } from "./card"
import { withRouter } from "react-router-dom"

export class CardList extends React.Component {

  render() {
    const { history, species } = this.props

    return (
      <div className="card-list">
        {species.length === 0 && (
          <h3>No specie has been added</h3>
        )}

        {species.length !== 0 && species.map(specie => (
          <Card
            onClick={() => history.push(`/report/${specie.scientific_name}`)}
            key={specie.scientific_name}
            specie={specie}
          />
        ))}
      </div>
    )
  }
}

export default withRouter(CardList)
