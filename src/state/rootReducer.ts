import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

import round from './round'
import rounds from './rounds'
import request from './request'

const rootReducer = combineReducers({
  round,
  rounds,
  request,
  loadingBar: loadingBarReducer
})

export default rootReducer
