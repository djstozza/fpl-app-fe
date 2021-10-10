import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { FPL_TEAM_LISTS, LIST_POSITIONS } from 'test/fixtures'

import type { State } from './reducer'

const errors = [{ failure: true }]

describe('Fpl team list reducer handles action', () => {
  test(success(actions.API_FPL_TEAM_LISTS_SHOW), () => {
    const state = { ...initialState, listPositions: LIST_POSITIONS }

    expect(reducer(state, {
      type: success(actions.API_FPL_TEAM_LISTS_SHOW),
      data: FPL_TEAM_LISTS[0]
    }))
      .toEqual({ ...state, data: FPL_TEAM_LISTS[0] })
  })

  test(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX, () => {
    expect(reducer(initialState, {
      type: actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX
    }))
      .toEqual({ ...initialState, fetching: true })
  })

  test(success(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX), () => {
    const state = { ...initialState, data: FPL_TEAM_LISTS[0] }

    expect(reducer(state, {
      type: success(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX),
      data: LIST_POSITIONS
    }))
      .toEqual({ ...state, listPositions: LIST_POSITIONS, submitting: false })
  })

  test(`${success(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX)} - no data`, () => {
    const state = { ...initialState, data: FPL_TEAM_LISTS[0] }

    expect(reducer(state, {
      type: success(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX)
    }))
      .toEqual({ ...state, listPositions: [], submitting: false })
  })

  test(success(actions.API_FPL_TEAM_LISTS_UPDATE), () => {
    const state = { ...initialState, data: FPL_TEAM_LISTS[0] }

    expect(reducer(state, {
      type: success(actions.API_FPL_TEAM_LISTS_UPDATE),
      data: LIST_POSITIONS
    }))
      .toEqual({ ...state, listPositions: LIST_POSITIONS, submitting: false })
  })

  test(actions.API_FPL_TEAM_LISTS_UPDATE, () => {
    const state = { ...initialState, data: FPL_TEAM_LISTS[0] }

    expect(reducer(state, {
      type: actions.API_FPL_TEAM_LISTS_UPDATE
    }))
      .toEqual({ ...state, submitting: true })
  })

  test(actions.SET_OUT_LIST_POSITION, () => {
    const state = { ...initialState, data: FPL_TEAM_LISTS[0], listPositions: LIST_POSITIONS }

    expect(reducer(state, {
      type: actions.SET_OUT_LIST_POSITION,
      outListPosition: LIST_POSITIONS[0]
    }))
      .toEqual({ ...state, outListPosition: LIST_POSITIONS[0] })
  })

  test(`${actions.SET_OUT_LIST_POSITION} - no out list position`, () => {
    const state = {
      ...initialState,
      data: FPL_TEAM_LISTS[0],
      listPositions: LIST_POSITIONS,
      outListPosition: LIST_POSITIONS[0]
    }

    expect(reducer(state, {
      type: actions.SET_OUT_LIST_POSITION
    }))
      .toEqual({ ...state, outListPosition: undefined })
  })

  test(failure(actions.API_FPL_TEAM_LISTS_SHOW), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LISTS_SHOW),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LISTS_UPDATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LISTS_UPDATE),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ ...initialState })
  })
})
