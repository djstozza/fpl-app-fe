import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { MANCHESTER_UNITED, TEAM_FIXTURES } from 'test/fixtures'

import type { State } from './reducer'

const errors = [{ failure: true }]

describe('Team reducer handles action', () => {
  test(actions.API_TEAMS_SHOW, () => {
    const newSort = {
      players: {
        redCards: 'desc'
      },
      fixtures: {
        strength: 'desc'
      }
    }
    expect(reducer(initialState, {
      type: actions.API_TEAMS_SHOW,
      sort: newSort
    }))
      .toEqual({ ...initialState, sort: newSort })
  })

  test(success(actions.API_TEAMS_SHOW), () => {
    expect(reducer(initialState, {
      type: success(actions.API_TEAMS_SHOW),
      data: MANCHESTER_UNITED,
    }))
      .toEqual({ ...initialState, data: MANCHESTER_UNITED })
  })

  test(`${success(actions.API_TEAMS_SHOW)} - no data`, () => {
    expect(reducer(initialState, {
      type: success(actions.API_TEAMS_SHOW)
    }))
      .toEqual({ ...initialState })
  })

  test(success(actions.API_TEAMS_FIXTURES_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_TEAMS_FIXTURES_INDEX),
      data: TEAM_FIXTURES
    }))
      .toEqual({ ...initialState, fixtures: TEAM_FIXTURES })
  })

  test(actions.UPDATE_TEAM_FIXTURES_SORT, () => {
    const newSort = { strength: 'desc' }

    expect(reducer(initialState, {
      type: actions.UPDATE_TEAM_FIXTURES_SORT,
      sort: newSort
    }))
      .toEqual({ ...initialState, sort: { ...initialState.sort, fixtures: newSort } })
  })

  test(actions.UPDATE_TEAM_PLAYERS_SORT, () => {
    const newSort = { redCards: 'desc' }
    expect(reducer(initialState, {
      type: actions.UPDATE_TEAM_PLAYERS_SORT,
      sort: newSort
    }))
      .toEqual({ ...initialState, sort: { ...initialState.sort, players: newSort } })
  })

  test(failure(actions.API_TEAMS_SHOW), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_TEAMS_SHOW),
      errors
    }))
      .toEqual({ ...initialState, errors })
  })

  test(failure(actions.API_TEAMS_FIXTURES_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_TEAMS_FIXTURES_INDEX),
      errors
    }))
      .toEqual({ ...initialState, errors })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ ...initialState })
  })
})
