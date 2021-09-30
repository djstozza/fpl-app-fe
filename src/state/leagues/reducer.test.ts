import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { LEAGUES } from 'test/fixtures'

import type { State } from './reducer'

const errors = [{ failure: true }]

describe('Leagues reducer handles action', () => {
  test(actions.INITIALIZE_FORM, () => {
    expect(reducer({ ...initialState, errors }, {
      type: actions.INITIALIZE_FORM
    }))
      .toEqual({ ...initialState })
  })

  test(actions.API_LEAGUES_CREATE, () => {
    expect(reducer(initialState, {
      type: actions.API_LEAGUES_CREATE
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(actions.API_LEAGUES_JOIN, () => {
    expect(reducer(initialState, {
      type: actions.API_LEAGUES_JOIN
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(success(actions.API_LEAGUES_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_LEAGUES_INDEX),
      data: LEAGUES
    }))
      .toEqual({ ...initialState, data: LEAGUES, submitting: false })
  })

  test(success(actions.API_LEAGUES_JOIN), () => {
    expect(reducer(initialState, {
      type: success(actions.API_LEAGUES_JOIN),
      data: LEAGUES
    }))
      .toEqual({ ...initialState, data: LEAGUES, submitting: false })
  })

  test(success(actions.API_LEAGUES_CREATE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_LEAGUES_CREATE),
      data: LEAGUES
    }))
      .toEqual({ ...initialState, data: LEAGUES, submitting: false })
  })

  test(`${success(actions.API_LEAGUES_INDEX)} - no data`, () => {
    expect(reducer(initialState, {
      type: success(actions.API_LEAGUES_INDEX)
    }))
      .toEqual({ ...initialState })
  })

  test(failure(actions.API_LEAGUES_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUES_INDEX),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_LEAGUES_JOIN), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUES_JOIN),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_LEAGUES_CREATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUES_CREATE),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ ...initialState })
  })
})
