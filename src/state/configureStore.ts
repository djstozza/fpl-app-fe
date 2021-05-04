import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import StateLoader from 'utilities/stateLoader'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'
import * as rootActions from './rootActions'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  { auth: StateLoader.getAuth() },
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

store.subscribe(() => {
  StateLoader.saveAuth(store.getState().auth)
})

const { auth } = store.getState()
store.dispatch(rootActions.appInitialization(auth))

export default store
