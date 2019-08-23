import React from 'react';

import './entry.styles.css';
import EntryDetail from '../entry-detail.component';


const Entry = (props) => {

  const [isOpen, setOpen] = React.useState(false);
  
  return (
    <div className='entry-container'
      onClick={() => setOpen(!isOpen)}>
      {/* <img src={`${props.specie.image}`} alt="specie" />
        <div className='card-info'>
          <img src={`https://robohash.org/${props.specie.id}?set=set4&size=180x180`} alt="" />
          <h2> {props.specie.name} </h2>
          <p>{props.specie.description}</p>
        </div> */}
      <p className='entryId'> {props.entryId}</p>
      <p className='userId'>{props.userId}</p>
      <p className='reliability'>{props.reliability}</p>
      {isOpen && (
        <>
          <br />
          <p> Now it's open</p>
          <EntryDetail specieId = {props.entryId}/>
        </>
      )}
    </div>


  )
}

export default Entry;