import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Error } from 'types'

import type { FplTeam } from 'types'

export type State = {
  data?: FplTeam,
  errors: Error[],
  submitting: boolean
}

export const initialState = {
  errors: [],
  submitting: false
}

const reducer = (state: State = initialState, action: Action) => {
  if (state === undefined) { state = initialState }
  const { data, errors } = action

  switch (action.type) {
    case success(actions.API_FPL_TEAMS_SHOW):
    case success(actions.API_FPL_TEAMS_UPDATE):
      return { ...state, data, submitting: false, errors: [] }
    case actions.API_FPL_TEAMS_UPDATE:
      return { ...state, submitting: true }
    case failure(actions.API_FPL_TEAMS_SHOW):
    case failure(actions.API_FPL_TEAMS_UPDATE):
      return { ...state, errors, submitting: false }
    default:
      return state
  }
}

export default reducer
