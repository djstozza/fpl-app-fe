import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import {
  LIVE_LEAGUE,
  FPL_TEAMS,
  errors
} from 'test/fixtures'

describe('League reducer handles action', () => {
  test(actions.API_LEAGUES_UPDATE, () => {
    expect(reducer(initialState, {
      type: actions.API_LEAGUES_UPDATE,
      meta: {}
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(actions.API_LEAGUE_GENERATE_DRAFT_PICKS, () => {
    expect(reducer(initialState, {
      type: actions.API_LEAGUE_GENERATE_DRAFT_PICKS,
      meta: {}
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(actions.API_LEAGUE_FPL_TEAMS_INDEX, () => {
    expect(reducer(initialState, {
      type: actions.API_LEAGUE_FPL_TEAMS_INDEX,
      meta: {}
    }))
      .toEqual({ ...initialState, fetching: true })
  })

  test(actions.API_LEAGUE_CREATE_DRAFT, () => {
    expect(reducer(initialState, {
      type: actions.API_LEAGUE_CREATE_DRAFT,
      meta: {}
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(actions.INITIALIZE_FORM, () => {
    expect(reducer({ ...initialState, errors }, {
      type: actions.INITIALIZE_FORM,
      meta: {}
    }))
      .toEqual(initialState)
  })

  test(success(actions.API_LEAGUES_SHOW), () => {
    expect(reducer(initialState, {
      type: success(actions.API_LEAGUES_SHOW),
      data: LIVE_LEAGUE,
      meta: {}
    }))
      .toEqual({ ...initialState, data: LIVE_LEAGUE })
  })

  test(success(actions.API_LEAGUES_UPDATE), () => {
    expect(reducer({ ...initialState, errors }, {
      type: success(actions.API_LEAGUES_UPDATE),
      data: LIVE_LEAGUE,
      meta: {}
    }))
      .toEqual({ ...initialState, data: LIVE_LEAGUE, submitting: false })
  })

  test(success(actions.API_LEAGUE_FPL_TEAMS_INDEX), () => {
    const state = { ...initialState, data: LIVE_LEAGUE }
    expect(reducer(state, {
      type: success(actions.API_LEAGUE_FPL_TEAMS_INDEX),
      data: FPL_TEAMS,
      meta: {}
    }))
      .toEqual({ ...state, fplTeams: FPL_TEAMS })
  })

  test(`${success(actions.API_LEAGUE_FPL_TEAMS_INDEX)} - no data`, () => {
    const state = { ...initialState, data: LIVE_LEAGUE }
    expect(reducer(state, {
      type: success(actions.API_LEAGUE_FPL_TEAMS_INDEX),
      meta: {}
    }))
      .toEqual({ ...state, fplTeams: [] })
  })

  test(success(actions.API_LEAGUE_GENERATE_DRAFT_PICKS), () => {
    const state = { ...initialState, data: LIVE_LEAGUE }
    expect(reducer(state, {
      type: success(actions.API_LEAGUE_GENERATE_DRAFT_PICKS),
      data: FPL_TEAMS,
      meta: {}
    }))
      .toEqual({ ...state, fplTeams: FPL_TEAMS })
  })

  test(actions.UPDATE_LEAGUE_FPL_TEAMS_SORT, () => {
    const newSort = { totalScore: 'desc' }

    expect(reducer(initialState, {
      type: actions.UPDATE_LEAGUE_FPL_TEAMS_SORT,
      sort: newSort,
      meta: {}
    }))
      .toEqual({ ...initialState, sort: newSort })
  })

  test(success(actions.API_LEAGUE_CREATE_DRAFT), () => {
    const state = { ...initialState, fplTeams: FPL_TEAMS }
    expect(reducer(state, {
      type: success(actions.API_LEAGUE_CREATE_DRAFT),
      data: LIVE_LEAGUE,
      meta: {}
    }))
      .toEqual({ ...state, fplTeams: FPL_TEAMS, data: LIVE_LEAGUE })
  })

  test(failure(actions.API_LEAGUES_SHOW), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUES_SHOW),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_LEAGUES_UPDATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUES_UPDATE),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_LEAGUE_GENERATE_DRAFT_PICKS), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUE_GENERATE_DRAFT_PICKS),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_LEAGUE_FPL_TEAMS_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUE_FPL_TEAMS_INDEX),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_LEAGUE_CREATE_DRAFT), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUE_CREATE_DRAFT),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown', meta: {} }))
      .toEqual({ ...initialState })
  })
})
