import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { FPL_TEAMS, errors } from 'test/fixtures'

describe('Fpl teams reducer handles action', () => {
  test(success(actions.API_FPL_TEAMS_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAMS_INDEX),
      data: FPL_TEAMS,
      meta: {}
    }))
      .toEqual({ ...initialState, data: FPL_TEAMS })
  })

  test(actions.API_FPL_TEAMS_INDEX, () => {
    expect(reducer(initialState, {
      type: actions.API_FPL_TEAMS_INDEX,
      meta: {}
    }))
      .toEqual({ ...initialState, fetching: true })
  })

  test(actions.UPDATE_FPL_TEAMS_SORT, () => {
    const newSort = { name: 'desc' }
    expect(reducer(initialState, {
      type: actions.UPDATE_FPL_TEAMS_SORT,
      sort: newSort,
      meta: {}
    }))
      .toEqual({ ...initialState, sort: newSort })
  })

  test(failure(actions.API_FPL_TEAMS_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAMS_INDEX),
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
