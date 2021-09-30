import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { TRADES } from 'test/fixtures'

import type { State } from './reducer'

const errors = [{ failure: true }]

describe('Trades reducer handles action', () => {
  test(actions.API_LIST_POSITION_TRADES_CREATE, () => {
    expect(reducer(initialState, {
      type: actions.API_LIST_POSITION_TRADES_CREATE
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(success(actions.API_FPL_TEAM_LIST_TRADES_INDEX), () => {
    expect(reducer({ ...initialState, errors }, {
      type: success(actions.API_FPL_TEAM_LIST_TRADES_INDEX),
      data: TRADES,
    }))
      .toEqual({ ...initialState, data: TRADES, submitting: false })
  })

  test(success(actions.API_LIST_POSITION_TRADES_CREATE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_LIST_POSITION_TRADES_CREATE),
      data: TRADES,
    }))
      .toEqual({ ...initialState, data: TRADES, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_TRADES_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_TRADES_INDEX),
      errors
    }))
      .toEqual({ ...initialState, errors })
  })

  test(failure(actions.API_LIST_POSITION_TRADES_CREATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LIST_POSITION_TRADES_CREATE),
      errors
    }))
      .toEqual({ ...initialState, errors })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ ...initialState })
  })
})
