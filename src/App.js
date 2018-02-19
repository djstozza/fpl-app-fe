import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Rounds from './containers/rounds.js';

import '../node_modules/materialize-css/dist/js/materialize.min.js';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import 'react-table/react-table.css';

const history = createHistory();
const middleware = routerMiddleware(history);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const moment = require('moment-timezone');
const tz = moment.tz.guess();


export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" render={(props) => (<Rounds {...props} tz={tz}/>)} />
            <Route exact path="/rounds" render={(props) => (<Rounds {...props} tz={tz}/>)} />
            <Route exact path="/rounds/:id(\d+)" render={(props) => (<Rounds {...props} tz={tz}/>)} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}
