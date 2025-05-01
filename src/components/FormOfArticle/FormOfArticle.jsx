import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import { Spin, Alert } from 'antd';

import { errorClear, createArticle, updateArticle, getArticle } from '../../features/articlesSlice';

import './FormOfArticle.scss';

const FormOfArticle = () => {
  const user = useSelector((state) => state.user);
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  const history = useHistory();
  const match = useRouteMatch();
  const { id } = match.params;

  // Находим статью по slug (если редактируем)
  const article = articles.list.find((article) => article.slug === id);

  // Формируем дефолтные значения для формы
  const defaultValues = {
    title: article?.title || '',
    description: article?.description || '',
    body: article?.body || '',
    tagList: Array.isArray(article?.tagList) && article.tagList.length > 0
      ? article.tagList.map(tag => ({ text: tag }))
      : [{ text: '' }],
  };

  const { register, control, handleSubmit, setValue } = useForm({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  // Если статья изменилась (например, подгрузилась с сервера) - обновляем значения в форме
  useEffect(() => {
    if (article) {
      setValue('title', article.title || '');
      setValue('description', article.description || '');
      setValue('body', article.body || '');
      setValue(
        'tagList',
        Array.isArray(article.tagList) && article.tagList.length > 0
          ? article.tagList.map(tag => ({ text: tag }))
          : [{ text: '' }]
      );
    }
  }, [article, setValue]);

  // Если статья не загружена, но есть id - запрашиваем статью
  useEffect(() => {
    if (!article && id) {
      dispatch(getArticle({ slug: id, apiToken: user.user.token }));
    }
  }, [id, article, user, dispatch]);

  const onSubmit = (data) => {
    const arrayOfTags = data.tagList
      .filter(tag => tag.text && tag.text.trim() !== '')
      .map(tag => tag.text.trim());

    const articleData = {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: arrayOfTags,
    };

    const action = id
      ? updateArticle({ slug: id, apiToken: user.user.token, dataForUpdatingAnArticle: articleData })
      : createArticle({ apiToken: user.user.token, dataForCreatingAnArticle: articleData });

    dispatch(action);
    history.push('/');
  };

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

  // Пока статья подгружается - показываем спиннер
  if (!article && id) {
    return (
      <div className="wrapper">
        <div className="spin">
          <Spin />
        </div>
      </div>
    );
  }

  // Если пользователь не авторизован - редиректим на страницу входа
  if (!user.user.token) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <div className="wrapper">
      <form className="form-of-article" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-of-article__title">{id ? 'Edit Article' : 'Create New Article'}</h2>
        <p className="form-of-article__subtitle">Title</p>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <input {...field} type="text" className="input form-of-article__input" placeholder="Title" required />
          )}
        />
        <p className="form-of-article__subtitle">Short description</p>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <input {...field} type="text" className="input form-of-article__input" placeholder="Description" required />
          )}
        />
        <p className="form-of-article__subtitle">Text</p>
        <Controller
          name="body"
          control={control}
          render={({ field }) => (
            <textarea {...field} className="input form-of-article__textarea" placeholder="Text" required />
          )}
        />
        <p className="form-of-article__subtitle form-of-article__subtitle--more-margin-bottom">Tags</p>
        {fields.map((field, index) => (
          <div className="form-of-article__tag-input-and-buttons" key={field.id}>
            <Controller
              name={`tagList.${index}.text`}
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input form-of-article__tag-input" />
              )}
            />
            {fields.length > 1 && (
              <button type="button" onClick={() => remove(index)} className="transparent-button">
                Delete
              </button>
            )}
            {index === fields.length - 1 && (
              <button
                type="button"
                onClick={() => append({ text: '' })}
                className="form-of-article__button transparent-button"
              >
                Add tag
              </button>
            )}
          </div>
        ))}
        <button type="submit" className="form-of-article__button-send">Send</button>
      </form>
    </div>
  );
};

export default FormOfArticle;
