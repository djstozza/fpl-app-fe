import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { TEAMS } from 'test/fixtures'

import type { State } from './reducer'

const errors = [{ failure: true }]

describe('Teams reducer handles action', () => {
  test(actions.API_TEAMS_INDEX, () => {
    const newSort = {
      wins: 'desc'
    }
    expect(reducer(initialState, {
      type: actions.API_TEAMS_INDEX,
      sort: newSort
    }))
      .toEqual({ ...initialState, sort: newSort })
  })

  test(success(actions.API_TEAMS_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_TEAMS_INDEX),
      data: TEAMS,
    }))
      .toEqual({ ...initialState, data: TEAMS })
  })

  test(`${success(actions.API_TEAMS_INDEX)} - no data`, () => {
    expect(reducer(initialState, {
      type: success(actions.API_TEAMS_INDEX)
    }))
      .toEqual({ ...initialState })
  })

  test(failure(actions.API_TEAMS_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_TEAMS_INDEX),
      errors
    }))
      .toEqual({ ...initialState, errors })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ ...initialState })
  })
})
