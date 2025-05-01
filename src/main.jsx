import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/App/App'

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import articlesReducer from './features/articlesSlice';
import userReducer from './features/userSlice';


export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    user: userReducer,
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
