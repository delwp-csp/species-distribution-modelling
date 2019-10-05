import React from 'react';
import './card.styles.css';
// import gramini from '../img/gramini.jpg';
// import affinis from '../img/affinis.jpg'
// import ewingii from '../img/ewingii.jpg'
// import antechinus from '../img/antechinus.jpg'


export const Card = (props) => (
  <div className='card-container' onClick={props.onClick}>
    <img src={`https://robohash.org/${props.specie.scientific_name}?set=set2`} alt="" />
    <div className='card-info'>
      <h2> {props.specie.scientific_name.replace("_"," ").toUpperCase()} </h2>
      <p>{props.specie.description}</p>
    </div>

  </div>
);