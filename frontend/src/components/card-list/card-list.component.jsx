import React from 'react';
import './card-list.styles.css';
import { Card } from '../card/card.component';

export const CardList = props => (
  <div className='card-list'>
    {props.species.map(specie => (
      <Card key={specie.id} specie={specie} />
    ))}
  </div>
);