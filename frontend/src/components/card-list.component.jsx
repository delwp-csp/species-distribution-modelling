import React from 'react';
import './card-list.styles.css';
import { Card } from './card.component';
import MediaCard from './mediacard.component';

export const CardList = ({species, props}) => (
  <div className='card-list'>
    {console.log(species)}
    {species.map(specie => (
      <Card onClick = {()=> props.history.push(`/report/${specie.id}`)} key={specie.id} specie={specie} />
      // <MediaCard key={specie.id} props ={specie} />

    ))}
  </div>
);