import React from "react"
import "./card.css"

export const Card = props => (
  <div className="card-container" onClick={props.onClick}>
    <img
      src={`https://robohash.org/${props.specie.scientific_name}?set=set2`}
      alt=""
    />
    <div className="card-info">
      <h2> {props.specie.scientific_name.replace("_", " ").toUpperCase()} </h2>
      <p>{props.specie.description}</p>
    </div>
  </div>
)
