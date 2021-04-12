import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, TeamPlayer, Facets } from 'types'

export type State = {
  data: TeamPlayer[],
  facets: Facets,
  errors: Object[],
  filter: Object,
  sort: Object
}

export const initialState = {
  data: [],
  errors: [],
  facets: {},
  filter: {},
  sort: {
    totalPoints: 'desc'
  }
}

const reducer = (state: State = initialState, action: Action) => {
  if (state === undefined) { state = initialState }

  switch (action.type) {
    case actions.API_PLAYERS_INDEX:

      return { ...state, sort: action.sort, filter: action.filter }
    case success(actions.API_PLAYERS_INDEX):
      const { data = [] } = action

      return { ...state, data }
    case success(actions.API_PLAYERS_FACETS_INDEX):

      const { data: facets } = action
      return { ...state, facets }
    case actions.SET_PLAYERS_PARAMS:

      return { ...state, sort: action.sort, filter: action.filter }
    case failure(actions.API_PLAYERS_INDEX):
    case failure(actions.API_PLAYERS_FACETS_INDEX):
      const { errors } = action

      return { ...state, errors }

    default:
      return state
  }
}

export default reducer
