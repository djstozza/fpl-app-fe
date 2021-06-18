import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Facets, Error, DraftPick } from 'types'

export type State = {
  draftPicks: DraftPick[],
  draftFinished: boolean,
  userCanPick: boolean,
  nextDraftPickId?: string,
  facets: Facets,
  errors: Error[],
  filter: Object,
  sort: Object,
  meta: {
    total?: number
  },
  page: {
    offset: number,
    limit: number
  },
  submitting: boolean
}

export const initialFilterState = {
  page: { offset: 0, limit: 50 },
  filter: {},
  sort: {
    pickNumber: 'asc'
  }
}

export const initialState = {
  draftPicks: [],
  draftFinished: false,
  userCanPick: false,
  submitting: false,
  errors: [],
  facets: {},
  meta: {},
  ...initialFilterState
}

const reducer = (state: State = initialState, action: Action) => {
  if (state === undefined) { state = initialState }

  const {
    data: {
      draftPicks = [],
      draftFinished,
      userCanPick,
      nextDraftPickId
    } = {},
    meta,
    filter = {},
    sort = {},
    page = {},
    errors
  } = action

  switch (action.type) {
    case success(actions.API_LEAGUE_DRAFT_PICKS_INDEX):
    case success(actions.API_LEAGUE_DRAFT_PICK_UPDATE):
      return { ...state, errors: [], draftPicks, draftFinished, userCanPick, nextDraftPickId, meta, submitting: false }
    case success(actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX):
      return { ...state, facets: action.data }
    case actions.API_LEAGUE_DRAFT_PICK_UPDATE:
      return { ...state, submitting: true }
    case actions.API_LEAGUE_DRAFT_PICKS_INDEX:
      return { ...state, filter, sort, page }
    case failure(actions.API_LEAGUE_DRAFT_PICKS_INDEX):
    case failure(actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX):
    case failure(actions.API_LEAGUE_DRAFT_PICK_UPDATE):
      return { ...state, errors, submitting: false }
    default:
      return state
  }
}

export default reducer
