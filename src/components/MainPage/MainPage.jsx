import React from 'react';
import { Pagination, ConfigProvider, Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getArticles, errorClear } from '../../features/articlesSlice';
import ListOfDescriptionArticle from '../ListOfDescriptionArticle/ListOfDescriptionArticle';
import './MainPage.scss';

const MainPage = () => {
  const user = useSelector((state) => state.user);
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathParam } = useParams();
  const numberPage = pathParam ? parseInt(pathParam, 10) : 1;

  if (articles.status === 'rejected') {
    return (
      <div className="error-message">
        <Alert
          message="Ошибка"
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

  const handlePageChange = (pageNumber) => {
    dispatch(getArticles({ skip: pageNumber * 20 - 20, apiToken: user.user.token }));
    history.push(`/page/${pageNumber}`);
  };

  return (
    <div className="main-page">
      <ListOfDescriptionArticle />
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemBg: 'rgba(0, 0, 0, 0)',
              lineWidth: 0,
              colorPrimaryHover: 'white',
              colorPrimary: 'white',
              itemActiveBg: '#1890FF',
            },
          },
        }}
      >
        <Pagination
          align="center"
          pageSize={20}
          onChange={handlePageChange}
          current={numberPage}
          showSizeChanger={false}
          total={articles.articlesCount}
        />
      </ConfigProvider>
    </div>
  );
};

export default MainPage;
