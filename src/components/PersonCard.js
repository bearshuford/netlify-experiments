import React from 'react';
import { Link } from 'react-router-dom';

const PersonCard = ({
  id,
  name,
  poster
}) =>
  <Link
    tabIndex='0'
    to={`/person/${id}`}
    className='person-item search-result'
  >
    <div className='image-wrapper'>
      {!!poster && <img alt={name + ' poster'} src={poster} />}
    </div>
    <div>
      <h4>{name}</h4>
    </div>
  </Link>;

export default PersonCard;