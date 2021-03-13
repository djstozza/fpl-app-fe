import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

import rounds from './rounds'
import request from './request'

const rootReducer = combineReducers({
  rounds,
  request,
  loadingBar: loadingBarReducer
})

export default rootReducer
