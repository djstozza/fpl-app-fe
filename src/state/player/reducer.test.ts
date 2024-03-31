import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import {
  PLAYER_SUMMARIES,
  PLAYER_HISTORY,
  PLAYER_HISTORY_PAST,
  errors
} from 'test/fixtures'

describe('Player reducer handles action', () => {
  test(success(actions.API_PLAYERS_SHOW), () => {
    expect(reducer(initialState, {
      type: success(actions.API_PLAYERS_SHOW),
      data: PLAYER_SUMMARIES[0],
      sort: {},
      meta: {}
    }))
      .toEqual({ ...initialState, data: PLAYER_SUMMARIES[0] })
  })

  test(`${success(actions.API_PLAYERS_SHOW)} - no data`, () => {
    expect(reducer(initialState, {
      type: success(actions.API_PLAYERS_SHOW),
      sort: {},
      meta: {}
    }))
      .toEqual({ ...initialState })
  })

  test(success(actions.API_PLAYERS_HISTORY_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_PLAYERS_HISTORY_INDEX),
      data: PLAYER_HISTORY,
      sort: {},
      meta: {}
    }))
      .toEqual({ ...initialState, history: PLAYER_HISTORY })
  })

  test(success(actions.API_PLAYERS_HISTORY_PAST_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_PLAYERS_HISTORY_PAST_INDEX),
      data: PLAYER_HISTORY_PAST,
      sort: {},
      meta: {}
    }))
      .toEqual({ ...initialState, historyPast: PLAYER_HISTORY_PAST })
  })

  test(actions.UPDATE_PLAYER_HISTORY_SORT, () => {
    const newSort = { goalsScored: 'desc' }
    expect(reducer(initialState, {
      type: actions.UPDATE_PLAYER_HISTORY_SORT,
      sort: newSort,
      meta: {}
    }))
      .toEqual({ ...initialState, sort: { ...initialState.sort, history: newSort }})
  })

  test(actions.API_PLAYERS_HISTORY_INDEX, () => {
    expect(reducer(initialState, {
      type: actions.API_PLAYERS_HISTORY_INDEX,
      sort: {},
      meta: {}
    }))
      .toEqual({ ...initialState, fetching: true })
  })

  test(actions.API_PLAYERS_HISTORY_PAST_INDEX, () => {
    expect(reducer(initialState, {
      type: actions.API_PLAYERS_HISTORY_PAST_INDEX,
      sort: {},
      meta: {}
    }))
      .toEqual({ ...initialState, fetching: true })
  })

  test(actions.UPDATE_PLAYER_HISTORY_PAST_SORT, () => {
    const newSort = { minutes: 'asc' }
    expect(reducer(initialState, {
      type: actions.UPDATE_PLAYER_HISTORY_PAST_SORT,
      sort: newSort,
      meta: {}
    }))
      .toEqual({ ...initialState, sort: { ...initialState.sort, historyPast: newSort }})
  })

  test(failure(actions.API_PLAYERS_SHOW), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_PLAYERS_SHOW),
      errors,
      sort: {},
      meta: {}
    }))
      .toEqual({ ...initialState, errors })
  })

  test(failure(actions.API_PLAYERS_HISTORY_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_PLAYERS_HISTORY_INDEX),
      errors,
      sort: {},
      meta: {}
    }))
      .toEqual({ ...initialState, errors })
  })

  test(failure(actions.API_PLAYERS_HISTORY_PAST_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_PLAYERS_HISTORY_PAST_INDEX),
      errors,
      sort: {},
      meta: {}
    }))
      .toEqual({ ...initialState, errors })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown', sort: {}, meta: {} }))
      .toEqual({ ...initialState })
  })
})
