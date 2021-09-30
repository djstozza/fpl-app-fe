import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { FPL_TEAM_1 } from 'test/fixtures'

import type { State } from './reducer'

const state = { ...initialState, fplTeam: FPL_TEAM_1 }
const errors = [{ failure: true }]

describe('Fpl team reducer handles action', () => {
  test(success(actions.API_FPL_TEAMS_SHOW), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAMS_SHOW),
      data: FPL_TEAM_1
    }))
      .toEqual({ ...initialState, data: FPL_TEAM_1, submitting: false })
  })

  test(success(actions.API_FPL_TEAMS_UPDATE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAMS_UPDATE),
      data: FPL_TEAM_1
    }))
      .toEqual({ ...initialState, data: FPL_TEAM_1, submitting: false })
  })

  test(actions.API_FPL_TEAMS_UPDATE, () => {
    expect(reducer(state, {
      type: actions.API_FPL_TEAMS_UPDATE
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(failure(actions.API_FPL_TEAMS_SHOW), () => {
    expect(reducer(state, {
      type: failure(actions.API_FPL_TEAMS_SHOW),
      errors
    }))
      .toEqual({ ...state, errors, submitting: false })
  })

  test(failure(actions.API_FPL_TEAMS_UPDATE), () => {
    expect(reducer(state, {
      type: failure(actions.API_FPL_TEAMS_UPDATE),
      errors
    }))
      .toEqual({ ...state, errors, submitting: false })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ ...initialState })
  })
})
