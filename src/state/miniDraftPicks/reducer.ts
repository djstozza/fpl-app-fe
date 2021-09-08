import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Facets, Error, MiniDraftPick, Round } from 'types'

export type State = {
  data: MiniDraftPick[],
  miniDraftFinished: boolean,
  canMakeMiniDraftPick: boolean,
  facets: Facets,
  errors: Error[],
  filter: Object,
  sort: Object,
  season: string,
  round?: Round,
  fplTeamListId: string,
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
  miniDraftFinished: false,
  canMakeMiniDraftPick: false,
  submitting: false,
  errors: [],
  facets: {},
  meta: {},
  fplTeamListId: '',
  season: '',
  ...initialFilterState
}

const reducer = (state: State = initialState, action: Action) => {
  if (state === undefined) { state = initialState }

  const {
    data = [],
    meta,
    filter = {},
    sort = {},
    errors
  } = action

  switch (action.type) {
    case success(actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX):
      return { ...state, errors: [], data, meta, submitting: false }
    case success(actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE):
    case success(actions.API_LEAGUE_MINI_DRAFT_PICK_PASS):
    case success(actions.API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX):
      const { data: { canMakeMiniDraftPick, miniDraftFinished, season, round, fplTeamListId } } = action

      return { ...state, errors: [], canMakeMiniDraftPick, miniDraftFinished, season, round, fplTeamListId, submitting: false }
    case success(actions.API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX):
      return { ...state, facets: action.data }
    case actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE:
      return { ...state, submitting: true }
    case actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX:
      return { ...state, filter, sort }
    case failure(actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX):
    case failure(actions.API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX):
    case failure(actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE):
      return { ...state, errors, submitting: false }
    default:
      return state
  }
}

export default reducer
