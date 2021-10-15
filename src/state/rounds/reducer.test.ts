import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { ROUND_1 } from 'test/fixtures'

const errors = [{ failure: true }]

describe('Rounds reducer handles action', () => {
  test(success(actions.API_ROUNDS_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_ROUNDS_INDEX),
      data: [ROUND_1]
    }))
      .toEqual({ ...initialState, data: [ROUND_1] })
  })

  test(`${success(actions.API_ROUNDS_INDEX)} - no data`, () => {
    expect(reducer(initialState, {
      type: success(actions.API_ROUNDS_INDEX)
    }))
      .toEqual({ ...initialState })
  })

  test(failure(actions.API_ROUNDS_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_ROUNDS_INDEX),
      errors
    }))
      .toEqual({ ...initialState, errors })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ ...initialState })
  })
})
