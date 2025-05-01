import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../Header/Header'
import Article from '../Article/Article';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import EditProfile from '../EditProfile/EditProfile';
import FormOfArticle from '../FormOfArticle/FormOfArticle';
import MainPage from '../MainPage/MainPage';

import './App.scss';

const App = () => {
  const pathMainPage = ['/', '/page/:pathParam?', '/articles'];
  const pathArticle = '/article/:id';
  const pathSignUp = '/sign-up';
  const pathSignIn = '/sign-in';
  const pathEditProfile = '/profile';
  const pathFormOfNewArticle = '/new-article';
  const pathFormOfEditArticle = '/articles/:id/edit';

  return (
    <Router>
      <Header />
      <Route path={pathMainPage} component={MainPage} exact />
      <Route path={pathArticle} component={Article} />
      <Route path={pathSignUp} component={SignUp} />
      <Route path={pathSignIn} component={SignIn} />
      <Route path={pathEditProfile} component={EditProfile} />
      <Route path={pathFormOfNewArticle} component={FormOfArticle} />
      <Route path={pathFormOfEditArticle} component={FormOfArticle} />
    </Router>
  );
};

export default App;