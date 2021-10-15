import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { DRAFT_PICKS, DRAFT_PICK_FACETS } from 'test/fixtures'

const errors = [{ failure: true }]

describe('Draft picks reducer handles action', () => {
  test(success(actions.API_LEAGUE_DRAFT_PICKS_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_LEAGUE_DRAFT_PICKS_INDEX),
      data: DRAFT_PICKS,
      meta: { total: DRAFT_PICKS.length }
    }))
      .toEqual({ ...initialState, data: DRAFT_PICKS, meta: { total: DRAFT_PICKS.length }, submitting: false })
  })

  test(success(actions.API_LEAGUE_DRAFT_PICK_UPDATE), () => {
    const state = { ...initialState, errors }
    expect(reducer(state, {
      type: success(actions.API_LEAGUE_DRAFT_PICK_UPDATE),
      data: DRAFT_PICKS,
      meta: { total: DRAFT_PICKS.length }
    }))
      .toEqual({ ...initialState, data: DRAFT_PICKS, meta: { total: DRAFT_PICKS.length }, submitting: false })
  })

  test(success(actions.API_LEAGUE_DRAFT_PICKS_STATUS_INDEX), () => {
    const state = { ...initialState, draftPicks: DRAFT_PICKS, errors }
    const data = {
      userCanPick: true,
      nextDraftPickId: true,
      draftFinished: true,
      canMakePlayerPick: true,
      canMakeMiniDraftPick: true
    }
    expect(reducer(state, {
      type: success(actions.API_LEAGUE_DRAFT_PICKS_STATUS_INDEX),
      data
    }))
      .toEqual({ ...state, ...data, errors: [] })
  })

  test(success(actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX),
      data: DRAFT_PICK_FACETS
    }))
      .toEqual({ ...initialState, facets: DRAFT_PICK_FACETS })
  })

  test(actions.API_LEAGUE_DRAFT_PICK_UPDATE, () => {
    expect(reducer(initialState, {
      type: actions.API_LEAGUE_DRAFT_PICK_UPDATE
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(actions.API_LEAGUE_DRAFT_PICKS_INDEX, () => {
    expect(reducer(initialState, {
      type: actions.API_LEAGUE_DRAFT_PICKS_INDEX,
      filter: { team_ids: ['1', '2'] },
      sort: { pickNumber: 'desc' }
    }))
      .toEqual({ ...initialState, sort: { pickNumber: 'desc' }, filter: { team_ids: ['1', '2'] }, fetching: true })
  })

  test(failure(actions.API_LEAGUE_DRAFT_PICKS_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUE_DRAFT_PICKS_INDEX),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_LEAGUE_DRAFT_PICK_UPDATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUE_DRAFT_PICK_UPDATE),
      errors
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ ...initialState })
  })
})
