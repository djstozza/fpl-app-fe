import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Error } from 'types'

import type { FplTeamList } from 'types'

export type State = {
  data: FplTeamList[],
  errors: Error[]
}

export const initialState = {
  data: [],
  errors: []
}

const reducer = (state: State = initialState, action: Action) => {
  const { data, errors } = action

  switch (action.type) {
    case success(actions.API_FPL_TEAM_LISTS_INDEX):
      return { ...state, data }
    case failure(actions.API_FPL_TEAM_LISTS_INDEX):
      return { ...state, errors }
    default:
      return state
  }
}

export default reducer
