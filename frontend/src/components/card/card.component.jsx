import React from 'react';
import './card.styles.css';

export const Card = (props) => (
  <div className='card-container'>
    {/* <img src={`${props.specie.image}`} alt="specie" /> */}
    <div className='card-info'>
      <img src={`props.specie.image`} alt="" />
      <h2> {props.specie.name} </h2>
      <p>{props.specie.description}</p>
    </div>

  </div>
);