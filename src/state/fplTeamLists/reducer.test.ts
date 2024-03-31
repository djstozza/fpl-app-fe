import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { FPL_TEAM_LISTS, errors } from 'test/fixtures'

describe('Fplt team lists reducer handles action', () => {
  test(success(actions.API_FPL_TEAM_LISTS_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LISTS_INDEX),
      data: FPL_TEAM_LISTS,
      meta: {}
    }))
      .toEqual({ ...initialState, data: FPL_TEAM_LISTS })
  })

  test(failure(actions.API_FPL_TEAM_LISTS_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LISTS_INDEX),
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
