import React from 'react';

const PersonCard = ({
  setCredits,
  id,
  name,
  poster
}) =>
  <a
    onClick={() => setCredits(id, name)}
    className='person-item search-result'
    href='# '
  >
    <div className='image-wrapper'>
      {!!poster && <img alt={name + ' poster'} src={poster} />}
    </div>
    <div>
      <h4>{name}</h4>
    </div>
  </a>;

export default PersonCard;