import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { ROUND_1 } from 'test/fixtures'

import type { State } from './reducer'

const errors = [{ failure: true }]

describe('Round reducer handles action', () => {
  test(success(actions.API_ROUNDS_SHOW), () => {
    expect(reducer(initialState, {
      type: success(actions.API_ROUNDS_SHOW),
      data: ROUND_1
    }))
      .toEqual({ ...initialState, data: ROUND_1 })
  })

  test(`${success(actions.API_ROUNDS_SHOW)} - no data`, () => {
    expect(reducer(initialState, {
      type: success(actions.API_ROUNDS_SHOW)
    }))
      .toEqual({ ...initialState })
  })

  test(failure(actions.API_ROUNDS_SHOW), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_ROUNDS_SHOW),
      errors
    }))
      .toEqual({ ...initialState, errors })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ ...initialState })
  })
})
