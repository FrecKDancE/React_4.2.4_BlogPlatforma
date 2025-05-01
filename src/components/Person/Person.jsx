import React from 'react';
import PropTypes from 'prop-types';
import Author from '../Author/Author';
import User from '../User/User';
import './Person.scss';

const Person = ({ isAuthor = false, author = null, dataOfUpdate }) => {
  if (isAuthor || author) {
    return <Author author={author} dataOfUpdate={dataOfUpdate} />;
  }

  return <User />;
};

Person.propTypes = {
  isAuthor: PropTypes.bool,
  author: PropTypes.object,
  dataOfUpdate: PropTypes.string,
};

export default Person;
