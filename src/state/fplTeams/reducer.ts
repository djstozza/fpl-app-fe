import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Error } from 'types'

import type { FplTeam } from 'types'

export type State = {
  data: FplTeam[],
  errors: Error[],
  sort?: Object
}

export const initialFilterState = {
  sort: {
    name: 'asc'
  }
}

export const initialState = {
  data: [],
  errors: [],
  ...initialFilterState
}

const reducer = (state: State = initialState, action: Action) => {
  const { data = [], errors, sort } = action

  switch (action.type) {
    case success(actions.API_FPL_TEAMS_INDEX):
      return { ...state, data }
    case actions.UPDATE_FPL_TEAMS_SORT:
      return { ...state, sort }
    case failure(actions.API_FPL_TEAMS_INDEX):
      return { ...state, errors }
    default:
      return state
  }
}

export default reducer
