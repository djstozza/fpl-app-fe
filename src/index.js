import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './index.css';

require('bootstrap');


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
registerServiceWorker();
