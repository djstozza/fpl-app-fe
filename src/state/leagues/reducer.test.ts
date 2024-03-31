import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { LEAGUES, errors } from 'test/fixtures'

describe('Leagues reducer handles action', () => {
  test(actions.INITIALIZE_FORM, () => {
    expect(reducer({ ...initialState, errors }, {
      type: actions.INITIALIZE_FORM,
      meta: {}
    }))
      .toEqual({ ...initialState })
  })

  test(actions.API_LEAGUES_INDEX, () => {
    expect(reducer(initialState, {
      type: actions.API_LEAGUES_INDEX,
      meta: {}
    }))
      .toEqual({ ...initialState, fetching: true })
  })

  test(actions.API_LEAGUES_CREATE, () => {
    expect(reducer(initialState, {
      type: actions.API_LEAGUES_CREATE,
      meta: {}
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(actions.API_LEAGUES_JOIN, () => {
    expect(reducer(initialState, {
      type: actions.API_LEAGUES_JOIN,
      meta: {}
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(success(actions.API_LEAGUES_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_LEAGUES_INDEX),
      data: LEAGUES,
      meta: {}
    }))
      .toEqual({ ...initialState, data: LEAGUES, submitting: false })
  })

  test(success(actions.API_LEAGUES_JOIN), () => {
    expect(reducer(initialState, {
      type: success(actions.API_LEAGUES_JOIN),
      data: LEAGUES,
      meta: {}
    }))
      .toEqual({ ...initialState, data: LEAGUES, submitting: false })
  })

  test(success(actions.API_LEAGUES_CREATE), () => {
    expect(reducer(initialState, {
      type: success(actions.API_LEAGUES_CREATE),
      data: LEAGUES,
      meta: {}
    }))
      .toEqual({ ...initialState, data: LEAGUES, submitting: false })
  })

  test(`${success(actions.API_LEAGUES_INDEX)} - no data`, () => {
    expect(reducer(initialState, {
      type: success(actions.API_LEAGUES_INDEX),
      meta: {}
    }))
      .toEqual({ ...initialState })
  })

  test(failure(actions.API_LEAGUES_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUES_INDEX),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_LEAGUES_JOIN), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUES_JOIN),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_LEAGUES_CREATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUES_CREATE),
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
