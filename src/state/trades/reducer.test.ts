import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { TRADES, errors } from 'test/fixtures'

describe('Trades reducer handles action', () => {
  test(actions.API_LIST_POSITION_TRADES_CREATE, () => {
    expect(reducer(initialState, {
      type: actions.API_LIST_POSITION_TRADES_CREATE,
      meta: {}
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(actions.API_FPL_TEAM_LIST_TRADES_INDEX, () => {
    expect(reducer(initialState, {
      type: actions.API_FPL_TEAM_LIST_TRADES_INDEX,
      meta: {}
    }))
      .toEqual({ ...initialState, fetching: true })
  })

  test(success(actions.API_FPL_TEAM_LIST_TRADES_INDEX), () => {
    expect(reducer({ ...initialState, errors }, {
      type: success(actions.API_FPL_TEAM_LIST_TRADES_INDEX),
      data: TRADES,
      meta: {}
    }))
      .toEqual({ ...initialState, data: TRADES, submitting: false })
  })

  test(success(actions.API_LIST_POSITION_TRADES_CREATE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_LIST_POSITION_TRADES_CREATE),
      data: TRADES,
      meta: {}
    }))
      .toEqual({ ...initialState, data: TRADES, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_TRADES_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_TRADES_INDEX),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors })
  })

  test(failure(actions.API_LIST_POSITION_TRADES_CREATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LIST_POSITION_TRADES_CREATE),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown', meta: {} }))
      .toEqual({ ...initialState })
  })
})
