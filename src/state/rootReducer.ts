import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

import request from './request'
import round from './round'
import rounds from './rounds'
import teams from './teams'
import team from './team'

const rootReducer = combineReducers({
  request,
  round,
  rounds,
  teams,
  team,
  loadingBar: loadingBarReducer
})

export default rootReducer
