import React from 'react';
import './card.styles.css';
// import Image from '../../img/gramini.jpg'

export const Card = (props) => (
  <div className='card-container' onClick={props.onClick}>
    <img src={`https://robohash.org/${props.specie.id}?set=set4`} alt="" />
    

    <div className='card-info'>
      {/* <img src={Image} alt="" /> */}

      <h2> {props.specie.name} </h2>
      <p>{props.specie.description}</p>
    </div>

  </div>
);