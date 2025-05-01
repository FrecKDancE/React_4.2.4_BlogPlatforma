import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Markdown from 'react-markdown';
import { Spin, Alert } from 'antd';

import { getArticle, errorClear } from '../../features/articlesSlice';
import DescriptionArticle from '../DescriptionArticle/DescriptionArticle';

import './Article.scss';

const Article = () => {
  const user = useSelector((state) => state.user);
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  const history = useHistory();
  const { params } = useRouteMatch();
  const { id } = params;

  const article = articles.list.find((article) => article.slug === id);

  useEffect(() => {
    if (!article && articles.status !== 'rejected') {
      dispatch(getArticle({ slug: id, apiToken: user.user.token }));
    }
  }, [article, id, user, articles.status, dispatch]);

  if (articles.status === 'rejected') {
    return (
      <div className="error-message">
        <Alert
          message="Error"
          description={articles.error}
          type="error"
          showIcon
          closable
          onClose={(e) => {
            e.preventDefault();
            dispatch(errorClear());
            history.replace('/');
          }}
        />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="wrapper">
        <div className="spin">
          <Spin />
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <article className="article">
        <DescriptionArticle
          isInsideArticle
          title={article.title}
          arrayOfTags={article.tagList}
          slug={article.slug}
          description={article.description}
          author={article.author}
          favorited={article.favorited}
          dataOfUpdate={article.updatedAt}
          favoritesCount={article.favoritesCount}
        />
        <div className="article__body">
          <div className="article__body-texts">
            <Markdown>{article.body}</Markdown>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Article;
