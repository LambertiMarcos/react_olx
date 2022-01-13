import React from 'react';
import ReactDOM from 'react-dom';
// para utilizar o redux
import { createStore } from 'redux';
import { Provider } from 'react-redux'; 

import App from './App';
import Reducers  from './Reducers';

// store para utilizar os reducers
const store = createStore(Reducers);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);


