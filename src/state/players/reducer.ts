import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, TeamPlayer, Facets } from 'types'

export type State = {
  data: TeamPlayer[],
  facets: Facets,
  errors: Object[],
  filter: Object,
  sort: Object,
  meta: {
    total?: number
  },
  page: {
    offset: number,
    limit: number
  }
}

export const initialFilterState = {
  page: { offset: 0, limit: 50 },
  filter: {},
  sort: {
    totalPoints: 'desc'
  }
}

export const initialState = {
  data: [],
  errors: [],
  facets: {},
  meta: {},
  ...initialFilterState
}

const reducer = (state: State = initialState, action: Action) => {
  const { data = [], meta, filter = {}, sort = {}, page = {}, errors } = action

  switch (action.type) {
    case success(actions.API_PLAYERS_INDEX):
      return { ...state, data, meta }
    case success(actions.API_PLAYERS_FACETS_INDEX):
      return { ...state, facets: action.data }
    case actions.API_PLAYERS_INDEX:
      return { ...state, filter, sort, page }
    case failure(actions.API_PLAYERS_INDEX):
    case failure(actions.API_PLAYERS_FACETS_INDEX):
      return { ...state, errors }
    default:
      return state
  }
}

export default reducer
