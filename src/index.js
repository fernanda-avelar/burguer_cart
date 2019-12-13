import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import cartReducer from './components/reducers/cartReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import '../node_modules/semantic-ui-css/semantic.min.css';
/* eslint-disable no-underscore-dangle */
const store = createStore(
    cartReducer,
    composeWithDevTools( )
      
    );
/* eslint-enable */

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

