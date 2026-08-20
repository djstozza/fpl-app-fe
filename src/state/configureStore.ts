import { configureStore } from '@reduxjs/toolkit'

import StateLoader from 'utilities/stateLoader'
import rootReducer from './rootReducer'
import * as rootActions from './rootActions'

const preloadedState = {
  auth: StateLoader.getAuth()
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState
})

store.subscribe(() => {
  StateLoader.saveAuth(store.getState().auth)
})

const { auth } = store.getState()
store.dispatch(rootActions.appInitialization(auth))

export default store
