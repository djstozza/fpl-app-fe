import * as actions from './actions'

describe('Request actions', () => {
  test(actions.CLEAR_REQUEST_ERRORS, () => {
    expect(actions.clearRequestErrors()).toEqual({ type: actions.CLEAR_REQUEST_ERRORS })
  })
})
