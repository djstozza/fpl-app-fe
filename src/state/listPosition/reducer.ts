import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Error, ListPosition, Facets } from 'types'

export type State = {
  validSubstitutions: string[],
  tradeableListPositions: ListPosition[],
  fetching: boolean,
  errors: Error[],
  facets: Facets,
  filter: Object,
  sort: Object
}
export const initialFilterState = {
  filter: {},
  sort: {
    lastName: 'asc'
  }
}

export const initialState = {
  validSubstitutions: [],
  tradeableListPositions: [],
  fetching: false,
  facets: {},
  errors: [],
  ...initialFilterState
}

const reducer = (state: State = initialState, action: Action) => {
  const { data: { validSubstitutions = [] } = {}, errors } = action

  switch (action.type) {
    case success(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS):
      return { ...state, tradeableListPositions: action.data }
    case success(actions.API_LIST_POSITION_SHOW):
      return { ...state, validSubstitutions, fetching: false }
    case success(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS):
      return { ...state, facets: action.data }
    case actions.API_LIST_POSITION_SHOW:
      return { ...state, fetching: true }
    case failure(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS):
    case failure(actions.API_LIST_POSITION_SHOW):
    case failure(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS):
      return { ...state, errors, fetching: false }
    case actions.CLEAR_VALID_SUBSTITUTIONS:
      return { ...state, validSubstitutions: [] }
    default:
      return state
  }
}

export default reducer
