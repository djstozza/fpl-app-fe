import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Facets, Error, DraftPick } from 'types'

export type State = {
  data: DraftPick[],
  draftFinished: boolean,
  userCanPick: boolean,
  canMakePlayerPick: boolean,
  canMakeMiniDraftPick: boolean,
  nextDraftPickId?: string,
  facets: Facets,
  errors: Error[],
  filter: Object,
  sort: Object,
  meta: {
    total?: number
  },
  submitting: boolean
}

export const initialFilterState = {
  filter: {},
  sort: {
    pickNumber: 'asc'
  }
}

export const initialState = {
  data: [],
  draftFinished: false,
  userCanPick: false,
  submitting: false,
  canMakePlayerPick: false,
  canMakeMiniDraftPick: false,
  errors: [],
  facets: {},
  meta: {},
  ...initialFilterState
}

const reducer = (state: State = initialState, action: Action) => {
  const {
    data = [],
    meta,
    filter = {},
    sort = {},
    errors
  } = action

  switch (action.type) {
    case success(actions.API_LEAGUE_DRAFT_PICKS_INDEX):
    case success(actions.API_LEAGUE_DRAFT_PICK_UPDATE):
      return { ...state, errors: [], data, meta, submitting: false }
    case success(actions.API_LEAGUE_DRAFT_PICKS_STATUS_INDEX):
      const { data: { userCanPick, nextDraftPickId, draftFinished, canMakePlayerPick, canMakeMiniDraftPick } } = action

      return { ...state, errors: [], userCanPick, nextDraftPickId, draftFinished, canMakePlayerPick, canMakeMiniDraftPick }
    case success(actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX):
      return { ...state, facets: action.data }
    case actions.API_LEAGUE_DRAFT_PICK_UPDATE:
      return { ...state, submitting: true }
    case actions.API_LEAGUE_DRAFT_PICKS_INDEX:
      return { ...state, filter, sort }
    case failure(actions.API_LEAGUE_DRAFT_PICKS_INDEX):
    case failure(actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX):
    case failure(actions.API_LEAGUE_DRAFT_PICK_UPDATE):
      return { ...state, errors, submitting: false }
    default:
      return state
  }
}

export default reducer
