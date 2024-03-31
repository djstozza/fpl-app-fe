import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import {
  MINI_DRAFT_PICKS,
  MINI_DRAFT_PICK_FACETS,
  MINI_DRAFT_PICK_1,
  ROUND_3,
  errors
} from 'test/fixtures'

describe('Mini draft picks reducer handles action', () => {
  test(success(actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX), () => {
    expect(reducer({ ...initialState, errors }, {
      type: success(actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX),
      data: MINI_DRAFT_PICKS,
      meta: { total: MINI_DRAFT_PICKS.length }
    }))
      .toEqual({ ...initialState, data: MINI_DRAFT_PICKS, meta: { total: MINI_DRAFT_PICKS.length }, submitting: false })
  })

  test(success(actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE), () => {
    const data = {
      canMakeMiniDraftPick: true,
      miniDraftFinished: false,
      season: 'winter',
      round: ROUND_3,
      fplTeamListId: '1'
    }
    expect(reducer(initialState, {
      type: success(actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE),
      data,
      meta: {}
    }))
      .toEqual({ ...initialState, ...data, submitting: false })
  })

  test(success(actions.API_LEAGUE_MINI_DRAFT_PICK_PASS), () => {
    const data = {
      canMakeMiniDraftPick: false,
      miniDraftFinished: true,
      season: 'winter',
      round: ROUND_3
    }
    expect(reducer({ ...initialState, errors }, {
      type: success(actions.API_LEAGUE_MINI_DRAFT_PICK_PASS),
      data,
      meta: {}
    }))
      .toEqual({ ...initialState, ...data, fplTeamListId: undefined, submitting: false })
  })

  test(success(actions.API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX), () => {
    const data = {
      canMakeMiniDraftPick: false,
      miniDraftFinished: false,
      season: 'winter',
      round: ROUND_3,
      fplTeamListId: '1'
    }
    expect(reducer({ ...initialState, errors }, {
      type: success(actions.API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX),
      data,
      meta: {}
    }))
      .toEqual({ ...initialState, ...data, submitting: false })
  })

  test(success(actions.API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX), () => {
    expect(reducer({ ...initialState, data: [MINI_DRAFT_PICK_1] }, {
      type: success(actions.API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX),
      data: MINI_DRAFT_PICK_FACETS,
      meta: {}
    }))
      .toEqual({ ...initialState, data: [MINI_DRAFT_PICK_1], facets: MINI_DRAFT_PICK_FACETS })
  })

  test(actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE, () => {
    expect(reducer(initialState, {
      type: actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE,
      meta: {}
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX, () => {
    expect(reducer(initialState, {
      type: actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX,
      sort: { pickNumber: 'asc' },
      filter: { position_id: ['0', '1'] },
      meta: {}
    }))
      .toEqual({ ...initialState, sort: { pickNumber: 'asc' }, filter: { position_id: ['0', '1'] }, fetching: true })
  })

  test(failure(actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX),
      errors,
      meta: {}
    }))
      .toEqual({ ...initialState, errors, submitting: false })
  })

  test(failure(actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE),
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
