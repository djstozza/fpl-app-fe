import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { ROUND_1, errors } from 'test/fixtures'

describe('Round reducer handles action', () => {
  test(success(actions.API_ROUNDS_SHOW), () => {
    expect(reducer(initialState, {
      type: success(actions.API_ROUNDS_SHOW),
      data: ROUND_1,
      meta: {}
    }))
      .toEqual({ ...initialState, data: ROUND_1 })
  })

  test(`${success(actions.API_ROUNDS_SHOW)} - no data`, () => {
    expect(reducer(initialState, {
      type: success(actions.API_ROUNDS_SHOW),
      meta: {}
    }))
      .toEqual({ ...initialState })
  })

  test(failure(actions.API_ROUNDS_SHOW), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_ROUNDS_SHOW),
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
