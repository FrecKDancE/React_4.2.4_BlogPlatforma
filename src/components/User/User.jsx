import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import authorIcon from '../../assets/icons/user.png';

const User = () => {
  const user = useSelector((state) => state.user);
  const [stateImage, setStateImage] = useState(user.user.image || authorIcon);

  useEffect(() => {
    setStateImage(user.user.image || authorIcon);
  }, [user.user.image]);

  if (!user.user.username) {
    return null;
  }
  
  return (
    <div className="person">
      <div className="person__description">
        <p className="person__name">{user.user.username}</p>
      </div>
      <img
        src={stateImage}
        className="person__image"
        alt="icon user"
        onError={() => setStateImage(authorIcon)}
      />
    </div>
  );
};

export default User;
