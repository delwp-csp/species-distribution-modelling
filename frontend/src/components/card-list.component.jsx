import React from 'react';
import './card-list.styles.css';
import { Card } from './card.component';
import MediaCard from './mediacard.component';

export const CardList = props => (
  <div className='card-list'>
    {console.log(props)}
    {props.species.map(specie => (
      <Card onClick={() => window.location.hash = `#/report/${specie.id}`} key={specie.id} specie={specie} />
      // <MediaCard key={specie.id} props ={specie} />

    ))}
  </div>
);