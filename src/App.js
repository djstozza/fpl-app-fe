import React, { Component } from 'react';

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import createHistory from 'history/createBrowserHistory'
import { Route, Redirect } from 'react-router'

import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { Switch } from 'react-router'


import rootReducer from './reducers/index'
import Rounds from './components/rounds/rounds.js';
import Team from './components/teams/team.js';
import Players from './components/players/players.js';
import Player from './components/players/player.js';
import Login from './components/users/login.js';
import Signup from './components/users/signup.js';
import Profile from './components/users/profile.js';
import ErrorHandler from './components/error_handler.js';

import Navbar from './components/users/navbar.js';

import isEmpty from 'lodash/isEmpty';

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
const tz = moment.tz.guess();

export default class App extends Component {
  render () {
    const PublicRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        <div>
          <Navbar {...props} />
          <Component {...props} tz={tz} />
        </div>
      )} />
    )

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        !isEmpty(localStorage.getItem('access-token'))
          ? <div><Navbar { ...props } /><Component {...props } tz={tz} /></div>
          : <Redirect to={{
              pathname: '/login',
              state: { referrer: props.location }
            }}/>
      )} />
    )

    return (
      <Provider store={store} >
        <ConnectedRouter history={history} >
          <div>
            <Switch>
              <PublicRoute exact path="/" component={ Rounds } />
              <PublicRoute exact path="/rounds" component={ Rounds } />
              <PublicRoute exact path="/rounds/:id(\d+)" component={ Rounds } />
              <PublicRoute exact path="/teams/:id(\d+)" component={ Team } />
              <PublicRoute exact path="/players" component={ Players } />
              <PublicRoute exact path="/players/:id(\d+)" component={ Player } />
              <PublicRoute exact path="/login" component={ Login } />
              <PublicRoute exact path="/sign-up" component={ Signup } />
              <PrivateRoute exact path="/profile" component={ Profile } />
              <Route component={ ErrorHandler } />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}
