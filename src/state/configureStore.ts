import { configureStore } from '@reduxjs/toolkit'

import createSagaMiddleware from 'redux-saga'

import StateLoader from 'utilities/stateLoader'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'
import * as rootActions from './rootActions'

const preloadedState = {
  auth: StateLoader.getAuth()
}

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  preloadedState
})

sagaMiddleware.run(rootSaga)

store.subscribe(() => {
  StateLoader.saveAuth(store.getState().auth)
})

const { auth } = store.getState()
store.dispatch(rootActions.appInitialization(auth))

export default store
