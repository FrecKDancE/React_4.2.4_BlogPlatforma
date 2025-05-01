import React, { useState } from 'react';
import { format } from 'date-fns';
import authorIcon from '../../assets/icons/user.png';

const Author = ({ author, dataOfUpdate }) => {
  const [imageSrc, setImageSrc] = useState(author.image || authorIcon);

  const handleImageError = () => {
    setImageSrc(authorIcon);
  };


  return (
    <div className="person">
      <div className="person__description">
        <p className="person__name">{author.username}</p>
        <p className="person__date-of-publication">{format(new Date(dataOfUpdate), 'PP')}</p>
      </div>
      <img
        src={imageSrc}
        className="person__image"
        onError={handleImageError}
        alt="icon author"
      />
    </div>
  );
};

export default Author;
