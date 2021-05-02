import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

import player from './player'
import players from './players'
import request from './request'
import round from './round'
import rounds from './rounds'
import signUp from './signUp'
import team from './team'
import teams from './teams'


const rootReducer = combineReducers({
  player,
  players,
  request,
  round,
  rounds,
  signUp,
  team,
  teams,
  loadingBar: loadingBarReducer
})

export default rootReducer
