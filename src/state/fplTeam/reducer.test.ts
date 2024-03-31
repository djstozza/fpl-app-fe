import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { FPL_TEAM_1, errors } from 'test/fixtures'

const state = { ...initialState, fplTeam: FPL_TEAM_1 }

describe('Fpl team reducer handles action', () => {
  test(success(actions.API_FPL_TEAMS_SHOW), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAMS_SHOW),
      data: FPL_TEAM_1,
      meta: {}
    }))
      .toEqual({ ...initialState, data: FPL_TEAM_1, submitting: false })
  })

  test(success(actions.API_FPL_TEAMS_UPDATE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAMS_UPDATE),
      data: FPL_TEAM_1,
      meta: {}
    }))
      .toEqual({ ...initialState, data: FPL_TEAM_1, submitting: false })
  })

  test(actions.API_FPL_TEAMS_UPDATE, () => {
    expect(reducer(state, {
      type: actions.API_FPL_TEAMS_UPDATE,
      meta: {}
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(failure(actions.API_FPL_TEAMS_SHOW), () => {
    expect(reducer(state, {
      type: failure(actions.API_FPL_TEAMS_SHOW),
      errors,
      meta: {}
    }))
      .toEqual({ ...state, errors, submitting: false })
  })

  test(failure(actions.API_FPL_TEAMS_UPDATE), () => {
    expect(reducer(state, {
      type: failure(actions.API_FPL_TEAMS_UPDATE),
      errors,
      meta: {}
    }))
      .toEqual({ ...state, errors, submitting: false })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown', meta: {} }))
      .toEqual({ ...initialState })
  })
})
