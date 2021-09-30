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
  const {
    data,
    errors
  } = action

  switch (action.type) {
    case actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE:
    case actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL:
    case actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE:
    case actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT:
    case actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE:
    case actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE:
    case actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE:
      return { ...state, submitting: true }
    case success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS):
    case success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE):
    case success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL):
    case success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE):
    case success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT):
    case success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE):
    case success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE):
    case success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE):
      return { ...state, data, submitting: false, errors: [] }
    case failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS):
    case failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE):
    case failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL):
    case failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE):
    case failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT):
    case failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE):
    case failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE):
    case failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE):
      return { ...state, errors, submitting: false }
    default:
      return state
  }
}

export default reducer
