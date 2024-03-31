import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { WAIVER_PICKS, errors } from 'test/fixtures'

describe('Waiver picks reducer handles action', () => {
  test(actions.API_LIST_POSITION_WAIVER_PICKS_CREATE, () => {
    expect(reducer(initialState, {
      type: actions.API_LIST_POSITION_WAIVER_PICKS_CREATE,
      meta: {}
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(actions.API_LIST_POSITION_WAIVER_PICKS_CREATE, () => {
    expect(reducer(initialState, {
      type: actions.API_LIST_POSITION_WAIVER_PICKS_CREATE,
      meta: {}
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX, () => {
    expect(reducer(initialState, {
      type: actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX,
      meta: {}
    }))
      .toEqual({ ...initialState, fetching: true })
  })

  test(success(actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX), () => {
    expect(reducer({ ...initialState, errors }, {
      type: success(actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX),
      data: WAIVER_PICKS,
      meta: {}
    }))
      .toEqual({ ...initialState, data: WAIVER_PICKS, submitting: false })
  })

  test(success(actions.API_LIST_POSITION_WAIVER_PICKS_CREATE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_LIST_POSITION_WAIVER_PICKS_CREATE),
      data: WAIVER_PICKS,
      meta: {}
    }))
      .toEqual({ ...initialState, data: WAIVER_PICKS, submitting: false })
  })

  test(success(actions.API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER), () => {
    expect(reducer(initialState, {
      type: success(actions.API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER),
      data: WAIVER_PICKS,
      meta: {}
    }))
      .toEqual({ ...initialState, data: WAIVER_PICKS, submitting: false })
  })

  test(failure(actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors })
  })

  test(failure(actions.API_LIST_POSITION_WAIVER_PICKS_CREATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LIST_POSITION_WAIVER_PICKS_CREATE),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors })
  })

  test(failure(actions.API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown', meta: {} }))
      .toEqual({ ...initialState })
  })
})
