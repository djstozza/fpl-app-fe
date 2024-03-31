import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import {
  MANCHESTER_UNITED,
  TEAM_FIXTURES,
  errors
} from 'test/fixtures'
import { initialFilterState } from './reducer'

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
      sort: newSort,
      meta: {}
    }))
      .toEqual({ ...initialState, sort: newSort })
  })

  test(success(actions.API_TEAMS_SHOW), () => {
    expect(reducer(initialState, {
      type: success(actions.API_TEAMS_SHOW),
      data: MANCHESTER_UNITED,
      sort: { players: {}, fixtures: {} },
      meta: {}
    }))
      .toEqual({ ...initialState, data: MANCHESTER_UNITED })
  })

  test(actions.API_TEAMS_FIXTURES_INDEX, () => {
    expect(reducer(initialState, {
      type: actions.API_TEAMS_FIXTURES_INDEX,
      sort: { players: {}, fixtures: {} },
      meta: {}
    }))
      .toEqual({ ...initialState, fetching: true })
  })

  test(`${success(actions.API_TEAMS_SHOW)} - no data`, () => {
    expect(reducer(initialState, {
      type: success(actions.API_TEAMS_SHOW),
      sort: { players: {}, fixtures: {} },
      meta: {}
    }))
      .toEqual({ ...initialState })
  })

  test(success(actions.API_TEAMS_FIXTURES_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_TEAMS_FIXTURES_INDEX),
      data: TEAM_FIXTURES,
      sort: { players: {}, fixtures: {} },
      meta: {}
    }))
      .toEqual({ ...initialState, fixtures: TEAM_FIXTURES })
  })

  test(actions.UPDATE_TEAM_FIXTURES_SORT, () => {
    const newSort = { strength: 'desc' }

    expect(reducer(initialState, {
      type: actions.UPDATE_TEAM_FIXTURES_SORT,
      sort: newSort,
      meta: {}
    }))
      .toEqual({ ...initialState, sort: { ...initialState.sort, fixtures: newSort } })
  })

  test(actions.UPDATE_TEAM_PLAYERS_SORT, () => {
    const newSort = { redCards: 'desc' }
    expect(reducer(initialState, {
      type: actions.UPDATE_TEAM_PLAYERS_SORT,
      sort: newSort,
      meta: {}
    }))
      .toEqual({ ...initialState, sort: { ...initialState.sort, players: newSort } })
  })

  test(failure(actions.API_TEAMS_SHOW), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_TEAMS_SHOW),
      errors,
      sort: { players: {}, fixtures: {} },
      meta: {}
    }))
      .toEqual({ ...initialState, errors })
  })

  test(failure(actions.API_TEAMS_FIXTURES_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_TEAMS_FIXTURES_INDEX),
      errors,
      sort: { players: {}, fixtures: {} },
      meta: {}
    }))
      .toEqual({ ...initialState, errors })
  })

  test('unknown type and undefined state', () => {
    expect(
      reducer(
        undefined,
        { 
          type: 'unknown',
          sort: { players: {}, fixtures: {} },
          meta: {}
        }
      )
    )
      .toEqual({ ...initialState })
  })
})
