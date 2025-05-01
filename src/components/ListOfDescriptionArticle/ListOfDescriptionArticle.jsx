import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getArticles, changeStateReRender } from '../../features/articlesSlice';
import DescriptionArticle from '../DescriptionArticle/DescriptionArticle';
import './ListOfDescriptionArticle.scss';

const ListOfDescriptionArticle = () => {
  const user = useSelector((state) => state.user);
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  const { pathParam } = useParams();
  const numberPage = pathParam ? parseInt(pathParam, 10) : 1;

  useEffect(() => {
    if (articles.isReRenderListOfDescription) {
      dispatch(getArticles({ skip: numberPage * 20 - 20, apiToken: user.user.token }));
      dispatch(changeStateReRender(false));
    }
  }, [articles.isReRenderListOfDescription, numberPage, dispatch, user]);

  useEffect(() => {
    if (articles.status !== 'loading' && articles.status !== 'rejected') {
      dispatch(getArticles({ skip: numberPage * 20 - 20, apiToken: user.user.token }));
    }
  }, [numberPage, dispatch, user, articles.status]);

  return (
    <div className="wrapper">
      <div className="list-of-description-article">
        {articles.list.map((article) => (
          <Link to={`/article/${article.slug}`} key={article.slug}>
            <DescriptionArticle
              title={article.title}
              arrayOfTags={article.tagList}
              slug={article.slug}
              description={article.description}
              author={article.author}
              dataOfUpdate={article.updatedAt}
              favorited={article.favorited}
              favoritesCount={article.favoritesCount}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListOfDescriptionArticle;
