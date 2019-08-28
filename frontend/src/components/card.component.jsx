import React from 'react';
import './card.styles.css';
// import gramini from '../img/gramini.jpg';
// import affinis from '../img/affinis.jpg'
// import ewingii from '../img/ewingii.jpg'
// import antechinus from '../img/antechinus.jpg'


export const Card = (props) => (
  <div className='card-container' onClick={props.onClick}>
    <img src={`https://robohash.org/${props.specie.id}?set=set2`} alt="" />
    {/* <img src = {`../img/${props.specie.image}`} alt = "specie image" /> */}
    {/* <img src = {image}></img> */}
    

    <div className='card-info'>

      <h2> {props.specie.name} </h2>
      <p>{props.specie.description}</p>
    </div>

  </div>
);