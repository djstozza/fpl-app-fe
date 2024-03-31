import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { LIST_POSITIONS, LIST_POSITION_FACETS, errors } from 'test/fixtures'

describe('List position reducer handles action', () => {
  test(success(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS), () => {
    expect(reducer(initialState, {
      type: success(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS),
      data: LIST_POSITIONS,
      meta: {}
    }))
      .toEqual({ ...initialState, tradeableListPositions: LIST_POSITIONS })
  })

  test(success(actions.API_LIST_POSITION_SHOW), () => {
    expect(reducer(initialState, {
      type: success(actions.API_LIST_POSITION_SHOW),
      data: { validSubstitutions: ['3', '4'] },
      meta: {}
    }))
      .toEqual({ ...initialState, validSubstitutions: ['3', '4'], fetching: false })
  })

  test(success(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS), () => {
    expect(reducer(initialState, {
      type: success(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS),
      data: LIST_POSITION_FACETS,
      meta: {}
    }))
      .toEqual({ ...initialState, facets: LIST_POSITION_FACETS })
  })

  test(actions.API_LIST_POSITION_SHOW, () => {
    expect(reducer(initialState, {
      type: actions.API_LIST_POSITION_SHOW,
      meta: {}
    }))
      .toEqual({ ...initialState, fetching: true })
  })

  test(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS, () => {
    expect(reducer(initialState, {
      type: actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS,
      meta: {}
    }))
      .toEqual({ ...initialState, fetching: true })
  })

  test(failure(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, fetching: false })
  })

  test(failure(actions.API_LIST_POSITION_SHOW), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LIST_POSITION_SHOW),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, fetching: false })
  })

  test(failure(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, fetching: false })
  })

  test(actions.CLEAR_VALID_SUBSTITUTIONS, () => {
    const state = { ...initialState, validSubstitutions: ['3', '4'] }
    expect(reducer(state, {
      type: actions.CLEAR_VALID_SUBSTITUTIONS,
      meta: {}
    }))
      .toEqual({ ...initialState })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown', meta: {} }))
      .toEqual({ ...initialState })
  })
})
