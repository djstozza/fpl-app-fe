import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { USER_1, errors } from 'test/fixtures'

describe('Auth reducer handles action', () => {
  test(actions.INITIALIZE_AUTH, () => {
    const state = { ...initialState, user: USER_1, errors }

    expect(reducer(state, {
      type: actions.INITIALIZE_AUTH,
      meta: {},
    }))
      .toEqual({ ...state, errors: [] })
  })

  test(actions.API_SESSIONS_CREATE, () => {
    const state = { ...initialState, user: USER_1 }

    expect(reducer(state, {
      type: actions.API_SESSIONS_CREATE,
      meta: {},
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(success(actions.API_SESSIONS_CREATE), () => {
    const state = { ...initialState, errors }

    expect(reducer(state, {
      type: success(actions.API_SESSIONS_CREATE),
      data: { token: '1234', user: USER_1 },
      meta: {}
    }))
      .toEqual({ ...state, token: '1234', user: USER_1, errors: [], submitting: false })
  })

  test(success(actions.API_SESSIONS_CREATE), () => {
    const state = { ...initialState, errors }

    expect(reducer(state, {
      type: success(actions.API_SESSIONS_CREATE),
      meta: {}
    }))
      .toEqual({ ...state, token: undefined, user: undefined, errors: [] })
  })

  test(success(actions.API_USERS_CREATE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_USERS_CREATE),
      data: { token: '1234', user: USER_1 },
      meta: {}
    }))
      .toEqual({ ...initialState, token: '1234', user: USER_1, submitting: false })
  })

  test(success(actions.API_SESSIONS_UPDATE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_SESSIONS_UPDATE),
      data: { token: '1234', user: USER_1 },
      meta: {}
    }))
      .toEqual({ ...initialState, token: '1234', user: USER_1, submitting: false })
  })

  test(success(actions.API_USERS_UPDATE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_USERS_UPDATE),
      data: { user: USER_1 },
      meta: {}
    }))
      .toEqual({ ...initialState, user: USER_1, submitting: false })
  })

  test(success(actions.API_PASSWORDS_UPDATE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_PASSWORDS_UPDATE),
      data: { user: USER_1 },
      meta: {}
    }))
      .toEqual({ ...initialState, user: USER_1, submitting: false })
  })

  test(failure(actions.API_SESSIONS_CREATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_SESSIONS_CREATE),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_USERS_CREATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_USERS_CREATE),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_USERS_UPDATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_USERS_UPDATE),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_PASSWORDS_UPDATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_PASSWORDS_UPDATE),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_SESSIONS_UPDATE), () => {
    const state = { ...initialState, user: USER_1 }
    expect(reducer(state, {
      type: failure(actions.API_SESSIONS_UPDATE),
      meta: {}
    }))
      .toEqual(initialState)
  })

  test(actions.LOG_OUT, () => {
    const state = { ...initialState, user: USER_1 }
    expect(reducer(state, {
      type: actions.LOG_OUT,
      meta: {}
    }))
      .toEqual(initialState)
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown', meta: {} }))
      .toEqual({ ...initialState })
  })
})
