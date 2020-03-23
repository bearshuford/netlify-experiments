import React from 'react';

const PersonCard = ({
  setCredits,
  id,
  name,
  poster
}) =>
  <div
    onClick={() => setCredits(id, name)}
    className='person-item search-result'
  >
    <div className='image-wrapper'>
      {!!poster && <img alt={name + ' poster'} src={poster} />}
    </div>
    <div>
      <h4>{name}</h4>
    </div>
  </div>;

export default PersonCard;