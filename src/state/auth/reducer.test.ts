import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { USER_1 } from 'test/fixtures'

const errors = [{ failure: true }]

describe('Auth reducer handles action', () => {
  test(actions.INITIALIZE_AUTH, () => {
    const state = { ...initialState, user: USER_1, errors }

    expect(reducer(state, {
      type: actions.INITIALIZE_AUTH
    }))
      .toEqual({ ...state, errors: [] })
  })

  test(actions.API_SESSIONS_CREATE, () => {
    const state = { ...initialState, user: USER_1 }

    expect(reducer(state, {
      type: actions.API_SESSIONS_CREATE
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(success(actions.API_SESSIONS_CREATE), () => {
    const state = { ...initialState, errors }

    expect(reducer(state, {
      type: success(actions.API_SESSIONS_CREATE),
      data: { token: '1234', user: USER_1 }
    }))
      .toEqual({ ...state, token: '1234', user: USER_1, errors: [], submitting: false })
  })

  test(success(actions.API_SESSIONS_CREATE), () => {
    const state = { ...initialState, errors }

    expect(reducer(state, {
      type: success(actions.API_SESSIONS_CREATE),
    }))
      .toEqual({ ...state, token: undefined, user: undefined, errors: [] })
  })

  test(success(actions.API_USERS_CREATE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_USERS_CREATE),
      data: { token: '1234', user: USER_1 }
    }))
      .toEqual({ ...initialState, token: '1234', user: USER_1, submitting: false })
  })

  test(success(actions.API_SESSIONS_UPDATE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_SESSIONS_UPDATE),
      data: { token: '1234', user: USER_1 }
    }))
      .toEqual({ ...initialState, token: '1234', user: USER_1, submitting: false })
  })

  test(success(actions.API_USERS_UPDATE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_USERS_UPDATE),
      data: { user: USER_1 }
    }))
      .toEqual({ ...initialState, user: USER_1, submitting: false })
  })

  test(success(actions.API_PASSWORDS_UPDATE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_PASSWORDS_UPDATE),
      data: { user: USER_1 }
    }))
      .toEqual({ ...initialState, user: USER_1, submitting: false })
  })

  test(failure(actions.API_SESSIONS_CREATE), () => {
    const errors = [{ failure: true }]
    expect(reducer(initialState, {
      type: failure(actions.API_SESSIONS_CREATE),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_USERS_CREATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_USERS_CREATE),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_USERS_UPDATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_USERS_UPDATE),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_PASSWORDS_UPDATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_PASSWORDS_UPDATE),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_SESSIONS_UPDATE), () => {
    const state = { ...initialState, user: USER_1 }
    expect(reducer(state, {
      type: failure(actions.API_SESSIONS_UPDATE)
    }))
      .toEqual(initialState)
  })

  test(actions.LOG_OUT, () => {
    const state = { ...initialState, user: USER_1 }
    expect(reducer(state, {
      type: actions.LOG_OUT
    }))
      .toEqual(initialState)
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ ...initialState })
  })
})
