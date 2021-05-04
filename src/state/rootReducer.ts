import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

import auth from './auth'
import player from './player'
import players from './players'
import request from './request'
import round from './round'
import rounds from './rounds'
import team from './team'
import teams from './teams'


const rootReducer = combineReducers({
  auth,
  player,
  players,
  request,
  round,
  rounds,
  team,
  teams,
  loadingBar: loadingBarReducer
})

export default rootReducer
