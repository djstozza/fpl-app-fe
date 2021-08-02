import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Error, InterTeamTradeGroup } from 'types'

export type State = {
  data?: InterTeamTradeGroup,
  errors: Error[]
}

export const initialState = {
  submitting: false,
  errors: []
}

const reducer = (state: State = initialState, action: Action) => {
  if (state === undefined) { state = initialState }

  const {
    data,
    errors
  } = action

  switch (action.type) {
    case success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP):
      return { ...state, data, errors: [] }
    case failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP):
      return { ...state, errors }
    default:
      return state
  }
}

export default reducer
