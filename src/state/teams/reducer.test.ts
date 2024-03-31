import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { TEAMS, errors } from 'test/fixtures'

describe('Teams reducer handles action', () => {
  test(actions.API_TEAMS_INDEX, () => {
    const newSort = {
      wins: 'desc'
    }
    expect(reducer(initialState, {
      type: actions.API_TEAMS_INDEX,
      sort: newSort,
      meta: {}
    }))
      .toEqual({ ...initialState, sort: newSort, fetching: true })
  })

  test(success(actions.API_TEAMS_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_TEAMS_INDEX),
      data: TEAMS,
      sort: {},
      meta: {}
    }))
      .toEqual({ ...initialState, data: TEAMS })
  })

  test(`${success(actions.API_TEAMS_INDEX)} - no data`, () => {
    expect(reducer(initialState, {
      type: success(actions.API_TEAMS_INDEX),
      sort: {},
      meta: {}
    }))
      .toEqual({ ...initialState })
  })

  test(failure(actions.API_TEAMS_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_TEAMS_INDEX),
      errors,
      sort: {},
      meta: {}
    }))
      .toEqual({ ...initialState, errors })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown', sort: {}, meta: {} }))
      .toEqual({ ...initialState })
  })
})
