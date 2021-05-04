import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

import player from './player'
import players from './players'
import request from './request'
import round from './round'
import rounds from './rounds'
import session from './session'
import signUp from './signUp'
import team from './team'
import teams from './teams'


const rootReducer = combineReducers({
  player,
  players,
  request,
  round,
  rounds,
  session,
  signUp,
  team,
  teams,
  loadingBar: loadingBarReducer
})

export default rootReducer
