import * as actions from './rootActions'

describe('Root actions', () => {
  test(actions.APP_INITIALIZATION, () => {
    expect(actions.appInitialization({})).toEqual({ type: actions.APP_INITIALIZATION, auth: {} })
  })
})
