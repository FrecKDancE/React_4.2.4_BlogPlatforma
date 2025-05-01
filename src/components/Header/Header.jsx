import React from 'react';
import { Link } from 'react-router-dom';

import AccountAccessControlLinks from '../AccountAccessControlLinks/AccountAccessControlLinks';
import LinkCreateArticle from '../LinkCreateArticle/LinkCreateArticle';
import Person from '../Person/Person';

import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="wrapper">
        <div className="header__container">
          <Link to="/" className="header__logo">
            Realworld Blog
          </Link>
          <div className="header__function-and-information-panel">
            <LinkCreateArticle />
            <Link to="/profile" className="header__profile-link">
              <Person />
            </Link>
            <AccountAccessControlLinks />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
