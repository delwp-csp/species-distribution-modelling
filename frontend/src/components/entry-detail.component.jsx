import React from 'react';

const EntryDetail = ({specieId}) => {
  let entryDetail = require('../detail-data.json');
  const specieDetail = entryDetail[specieId-1];
  return (
    <div>
      <div className='detail'>
        <h3 className='detailHeading'>Site Name</h3>
        <p className='information'>{specieDetail.siteName}</p>
      </div>
      <div className='detail'>
        <h3 className='detailHeading'>Coordinate System</h3>
        <p className='information'>{specieDetail.coSys}</p>
      </div>
      <div className='detail'>
        <h3 className='detailHeading'>Spacial Accuracy</h3>
        <p className='information'>{specieDetail.spatialAccuracy}</p>
      </div>
    </div>
      
    )
}


export default EntryDetail;