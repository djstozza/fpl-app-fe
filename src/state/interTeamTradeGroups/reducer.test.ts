import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { INTER_TEAM_TRADE_GROUPS, errors } from 'test/fixtures'

const state = { ...initialState, data: INTER_TEAM_TRADE_GROUPS }

describe('Inter team trade groups reducer handles action', () => {
  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE, () => {
    expect(reducer(state, {
      type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE,
      meta: {}
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL, () => {
    expect(reducer(state, {
      type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL,
      meta: {}
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE, () => {
    expect(reducer(state, {
      type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE,
      meta: {}
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT, () => {
    expect(reducer(state, {
      type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT,
      meta: {}
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE, () => {
    expect(reducer(state, {
      type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE,
      meta: {}
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE, () => {
    expect(reducer(state, {
      type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE,
      meta: {}
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE, () => {
    expect(reducer(state, {
      type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE,
      meta: {}
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS),
      data: INTER_TEAM_TRADE_GROUPS,
      meta: {}
    }))
      .toEqual({ ...initialState, data: INTER_TEAM_TRADE_GROUPS, submitting: false })
  })

  test(success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE),
      data: INTER_TEAM_TRADE_GROUPS,
      meta: {}
    }))
      .toEqual({ ...initialState, data: INTER_TEAM_TRADE_GROUPS, submitting: false })
  })

  test(success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL),
      data: INTER_TEAM_TRADE_GROUPS,
      meta: {}
    }))
      .toEqual({ ...initialState, data: INTER_TEAM_TRADE_GROUPS, submitting: false })
  })

  test(success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE),
      data: INTER_TEAM_TRADE_GROUPS,
      meta: {}
    }))
      .toEqual({ ...initialState, data: INTER_TEAM_TRADE_GROUPS, submitting: false })
  })

  test(success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT),
      data: INTER_TEAM_TRADE_GROUPS,
      meta: {}
    }))
      .toEqual({ ...initialState, data: INTER_TEAM_TRADE_GROUPS, submitting: false })
  })

  test(success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE),
      data: INTER_TEAM_TRADE_GROUPS,
      meta: {}
    }))
      .toEqual({ ...initialState, data: INTER_TEAM_TRADE_GROUPS, submitting: false })
  })

  test(success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE),
      data: INTER_TEAM_TRADE_GROUPS,
      meta: {}
    }))
      .toEqual({ ...initialState, data: INTER_TEAM_TRADE_GROUPS, submitting: false })
  })

  test(success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE),
      data: INTER_TEAM_TRADE_GROUPS,
      meta: {}
    }))
      .toEqual({ ...initialState, data: INTER_TEAM_TRADE_GROUPS, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown', meta: {} }))
      .toEqual({ ...initialState })
  })
})
