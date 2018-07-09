import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer';


const store = createStore(reducer, applyMiddleware(ReduxThunk,ReduxLogger))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </Provider>

, document.getElementById('root'));
registerServiceWorker();
