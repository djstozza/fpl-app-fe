import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { INTER_TEAM_TRADE_GROUPS } from 'test/fixtures'

const errors = [{ failure: true }]
const state = { ...initialState, data: INTER_TEAM_TRADE_GROUPS }

describe('Inter team trade groups reducer handles action', () => {
  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE, () => {
    expect(reducer(state, {
      type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL, () => {
    expect(reducer(state, {
      type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE, () => {
    expect(reducer(state, {
      type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT, () => {
    expect(reducer(state, {
      type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE, () => {
    expect(reducer(state, {
      type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE, () => {
    expect(reducer(state, {
      type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE, () => {
    expect(reducer(state, {
      type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS),
      data: INTER_TEAM_TRADE_GROUPS
    }))
      .toEqual({ ...initialState, data: INTER_TEAM_TRADE_GROUPS, submitting: false })
  })

  test(success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE),
      data: INTER_TEAM_TRADE_GROUPS
    }))
      .toEqual({ ...initialState, data: INTER_TEAM_TRADE_GROUPS, submitting: false })
  })

  test(success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL),
      data: INTER_TEAM_TRADE_GROUPS
    }))
      .toEqual({ ...initialState, data: INTER_TEAM_TRADE_GROUPS, submitting: false })
  })

  test(success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE),
      data: INTER_TEAM_TRADE_GROUPS
    }))
      .toEqual({ ...initialState, data: INTER_TEAM_TRADE_GROUPS, submitting: false })
  })

  test(success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT),
      data: INTER_TEAM_TRADE_GROUPS
    }))
      .toEqual({ ...initialState, data: INTER_TEAM_TRADE_GROUPS, submitting: false })
  })

  test(success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE),
      data: INTER_TEAM_TRADE_GROUPS
    }))
      .toEqual({ ...initialState, data: INTER_TEAM_TRADE_GROUPS, submitting: false })
  })

  test(success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE),
      data: INTER_TEAM_TRADE_GROUPS
    }))
      .toEqual({ ...initialState, data: INTER_TEAM_TRADE_GROUPS, submitting: false })
  })

  test(success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE),
      data: INTER_TEAM_TRADE_GROUPS
    }))
      .toEqual({ ...initialState, data: INTER_TEAM_TRADE_GROUPS, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ ...initialState })
  })
})
