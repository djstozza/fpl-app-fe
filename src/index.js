import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { Switch } from 'react-router'


import rootReducer from './reducers/index'
import Rounds from './containers/rounds.js';
import Team from './containers/team.js';
import Players from './containers/players.js';
import ErrorHandler from './containers/error_handler.js';

const history = createHistory()
const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
]

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

export const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

const moment = require('moment-timezone');
const bootstrap = require('bootstrap');
const tz = moment.tz.guess();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" render={(props) => (<Rounds {...props} tz={tz}/>)} />
        <Route exact path="/rounds" render={(props) => (<Rounds {...props} tz={tz}/>)} />
        <Route exact path="/rounds/:id(\d+)" render={(props) => (<Rounds {...props} tz={tz}/>)} />
        <Route exact path="/teams/:id(\d+)" render={(props) => (<Team {...props} tz={tz}/>)} />
        <Route exact path="/players" render={(props) => (<Players {...props} tz={tz}/>)} />
        <Route component={ ErrorHandler } />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
