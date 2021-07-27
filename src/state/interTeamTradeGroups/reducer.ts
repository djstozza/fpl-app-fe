import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Error, InterTeamTradeGroups } from 'types'

export type State = {
  data: InterTeamTradeGroups,
  errors: Error[],
  submitting: boolean
}

export const initialState = {
  data: {
    outTradeGroups: [],
    inTradeGroups: [],
  },
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
    case actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE:
      return { ...state, submitting: true }
    case success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE):
      return { ...state, data, submitting: false, errors: [] }
    case failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE):
      return { ...state, errors, submitting: false }
    default:
      return state
  }
}

export default reducer
