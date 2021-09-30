import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { INTER_TEAM_TRADE_GROUP_1 } from 'test/fixtures'

import type { State } from './reducer'

const errors = [{ failure: true }]

describe('Inter team trade group reducer handles action', () => {
  test(success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP), () => {
    const state = { ...initialState, errors }
    expect(reducer(state, {
      type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP),
      data: INTER_TEAM_TRADE_GROUP_1
    }))
      .toEqual({ ...initialState, data: INTER_TEAM_TRADE_GROUP_1, errors: [] })
  })

  test(`${success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP)} - no data`, () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP)
    }))
      .toEqual({ ...initialState })
  })

  test(failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP),
      errors
    }))
      .toEqual({ ...initialState, errors })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ ...initialState })
  })
})
