import StateLoader from 'utilities/stateLoader'
import * as rootActions from './rootActions'
import store from './configureStore'

describe('store', () => {
  it('should initialize with preloadedState', () => {
    const preloadedState = {
      auth: StateLoader.getAuth()
    }
    expect(store.getState().auth).toEqual(preloadedState.auth)
  })

  it('should dispatch appInitialization action', () => {
    const { auth } = store.getState()
    const spy = jest.spyOn(store, 'dispatch')
    store.dispatch(rootActions.appInitialization(auth))
    expect(spy).toHaveBeenCalledWith(rootActions.appInitialization(auth))
  })
})
