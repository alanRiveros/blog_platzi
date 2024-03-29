import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/iconos.css';
import App from './components/App';

import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import reduxThunk from 'redux-thunk'

import reducers from './reducers'

const store = createStore(
  reducers, //todos los reducers
  {}, // estado inicial
  applyMiddleware(reduxThunk)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
