import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { PLAYER_SUMMARIES, PLAYER_FACETS } from 'test/fixtures'

const errors = [{ failure: true }]

describe('Players reducer handles action', () => {
  test(success(actions.API_PLAYERS_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_PLAYERS_INDEX),
      data: PLAYER_SUMMARIES,
      meta: { total: PLAYER_SUMMARIES.length }
    }))
      .toEqual({ ...initialState, data: PLAYER_SUMMARIES, meta: { total: PLAYER_SUMMARIES.length } })
  })

  test(success(actions.API_PLAYERS_FACETS_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_PLAYERS_FACETS_INDEX),
      data: PLAYER_FACETS
    }))
      .toEqual({ ...initialState, facets: PLAYER_FACETS })
  })

  test(actions.API_PLAYERS_INDEX, () => {
    const newParams = {
      page: { offset: 0, limit: 50 },
      filter: { teamId: ['1', '2'] },
      sort: {
        lastName: 'desc'
      }
    }
    expect(reducer(initialState, {
      type: actions.API_PLAYERS_INDEX,
      ...newParams
    }))
      .toEqual({ ...initialState, ...newParams, fetching: true })
  })

  test(failure(actions.API_PLAYERS_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_PLAYERS_INDEX),
      errors
    }))
      .toEqual({ ...initialState, errors })
  })

  test(failure(actions.API_PLAYERS_FACETS_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_PLAYERS_FACETS_INDEX),
      errors
    }))
      .toEqual({ ...initialState, errors })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ ...initialState })
  })
})
