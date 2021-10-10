import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { LIVE_LEAGUE, FPL_TEAMS } from 'test/fixtures'

import type { State } from './reducer'

const errors = [{ failure: true }]

describe('League reducer handles action', () => {
  test(actions.API_LEAGUES_UPDATE, () => {
    expect(reducer(initialState, {
      type: actions.API_LEAGUES_UPDATE
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(actions.API_LEAGUE_GENERATE_DRAFT_PICKS, () => {
    expect(reducer(initialState, {
      type: actions.API_LEAGUE_GENERATE_DRAFT_PICKS
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(actions.API_LEAGUE_FPL_TEAMS_INDEX, () => {
    expect(reducer(initialState, {
      type: actions.API_LEAGUE_FPL_TEAMS_INDEX
    }))
      .toEqual({ ...initialState, fetching: true })
  })

  test(actions.API_LEAGUE_CREATE_DRAFT, () => {
    expect(reducer(initialState, {
      type: actions.API_LEAGUE_CREATE_DRAFT
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(actions.INITIALIZE_FORM, () => {
    expect(reducer({ ...initialState, errors }, {
      type: actions.INITIALIZE_FORM
    }))
      .toEqual(initialState)
  })

  test(success(actions.API_LEAGUES_SHOW), () => {
    expect(reducer(initialState, {
      type: success(actions.API_LEAGUES_SHOW),
      data: LIVE_LEAGUE
    }))
      .toEqual({ ...initialState, data: LIVE_LEAGUE })
  })

  test(success(actions.API_LEAGUES_UPDATE), () => {
    expect(reducer({ ...initialState, errors }, {
      type: success(actions.API_LEAGUES_UPDATE),
      data: LIVE_LEAGUE
    }))
      .toEqual({ ...initialState, data: LIVE_LEAGUE, submitting: false })
  })

  test(success(actions.API_LEAGUE_FPL_TEAMS_INDEX), () => {
    const state = { ...initialState, data: LIVE_LEAGUE }
    expect(reducer(state, {
      type: success(actions.API_LEAGUE_FPL_TEAMS_INDEX),
      data: FPL_TEAMS
    }))
      .toEqual({ ...state, fplTeams: FPL_TEAMS })
  })

  test(`${success(actions.API_LEAGUE_FPL_TEAMS_INDEX)} - no data`, () => {
    const state = { ...initialState, data: LIVE_LEAGUE }
    expect(reducer(state, {
      type: success(actions.API_LEAGUE_FPL_TEAMS_INDEX)
    }))
      .toEqual({ ...state, fplTeams: [] })
  })

  test(success(actions.API_LEAGUE_GENERATE_DRAFT_PICKS), () => {
    const state = { ...initialState, data: LIVE_LEAGUE }
    expect(reducer(state, {
      type: success(actions.API_LEAGUE_GENERATE_DRAFT_PICKS),
      data: FPL_TEAMS
    }))
      .toEqual({ ...state, fplTeams: FPL_TEAMS })
  })

  test(actions.UPDATE_LEAGUE_FPL_TEAMS_SORT, () => {
    const newSort = { totalScore: 'desc' }

    expect(reducer(initialState, {
      type: actions.UPDATE_LEAGUE_FPL_TEAMS_SORT,
      sort: newSort
    }))
      .toEqual({ ...initialState, sort: newSort })
  })

  test(success(actions.API_LEAGUE_CREATE_DRAFT), () => {
    const state = { ...initialState, fplTeams: FPL_TEAMS }
    expect(reducer(state, {
      type: success(actions.API_LEAGUE_CREATE_DRAFT),
      data: LIVE_LEAGUE
    }))
      .toEqual({ ...state, fplTeams: FPL_TEAMS, data: LIVE_LEAGUE })
  })

  test(failure(actions.API_LEAGUES_SHOW), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUES_SHOW),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_LEAGUES_UPDATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUES_UPDATE),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_LEAGUE_GENERATE_DRAFT_PICKS), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUE_GENERATE_DRAFT_PICKS),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_LEAGUE_FPL_TEAMS_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUE_FPL_TEAMS_INDEX),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_LEAGUE_CREATE_DRAFT), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUE_CREATE_DRAFT),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ ...initialState })
  })
})
