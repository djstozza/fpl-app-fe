import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { FPL_TEAM_LISTS } from 'test/fixtures'

import type { State } from './reducer'

const errors = [{ failure: true }]

describe('Fplt team lists reducer handles action', () => {
  test(success(actions.API_FPL_TEAM_LISTS_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LISTS_INDEX),
      data: FPL_TEAM_LISTS
    }))
      .toEqual({ ...initialState, data: FPL_TEAM_LISTS })
  })

  test(failure(actions.API_FPL_TEAM_LISTS_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LISTS_INDEX),
      errors
    }))
      .toEqual({ ...initialState, errors })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ ...initialState })
  })
})
