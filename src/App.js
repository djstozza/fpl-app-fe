import React, { Component } from 'react';

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import createHistory from 'history/createBrowserHistory'
import { Route, Redirect } from 'react-router'

import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { Switch } from 'react-router'

import Alert from 'react-s-alert';

import rootReducer from './reducers/index'
import Rounds from './components/rounds/rounds';
import Team from './components/teams/team';
import Players from './components/players/players';
import Player from './components/players/player';
import Login from './components/users/login';
import Signup from './components/users/signup';
import Profile from './components/users/profile';
import Edit from './components/users/edit';
import NewLeague from './components/leagues/new_league';
import JoinLeague from './components/leagues/join_league';
import EditLeague from './components/leagues/edit_league';
import League from './components/leagues/league';
import Draft from './components/draft/draft';
import FplTeams from './components/fpl_teams/fpl_teams';
import FplTeam from './components/fpl_teams/fpl_team';
import EditFplTeam from './components/fpl_teams/edit_fpl_team';
import ErrorHandler from './components/error_handler';

import Navbar from './components/users/navbar';

import isEmpty from 'lodash/isEmpty';

import './../node_modules/react-s-alert/dist/s-alert-default.css';
import './../node_modules/react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import './../node_modules/font-awesome/css/font-awesome.min.css';


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
            <Alert stack={ { limit: 3 } } />
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
              <PrivateRoute exact path="/user/edit" component={ Edit } />
              <PrivateRoute exact path="/leagues/new" component={ NewLeague } />
              <PrivateRoute exact path="/leagues/join" component={ JoinLeague } />
              <PrivateRoute exact path="/leagues/:id(\d+)" component={ League } />
              <PrivateRoute exact path="/leagues/:id(\d+)/edit" component={ EditLeague } />
              <PrivateRoute exact path="/leagues/:id(\d+)/draft" component={ Draft } />
              <PrivateRoute exact path="/fpl_teams" component={ FplTeams } />
              <PrivateRoute exact path="/fpl_teams/:id(\d+)" component={ FplTeam } />
              <PrivateRoute exact path="/fpl_teams/:id(\d+)/edit" component={ EditFplTeam } />
              <Route component={ ErrorHandler } />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}
