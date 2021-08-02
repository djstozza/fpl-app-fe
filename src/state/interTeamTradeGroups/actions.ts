import { ListPosition } from 'types'

export const API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS'
export const API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE'
export const API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT'
export const API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE'
export const API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL'
export const API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE'
export const API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE'
export const API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE'

export const fetchInterTeamTradeGroups = (fplTeamListId: string) =>
  ({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS, fplTeamListId })

export const createInterTeamTradeGroup = (inListPosition: ListPosition) =>
  ({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE, inListPosition })

export const submitInterTeamTradeGroup = (interTeamTradeGroupId: string) =>
  ({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT, interTeamTradeGroupId })

export const cancelInterTeamTradeGroup = (interTeamTradeGroupId: string) =>
  ({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL, interTeamTradeGroupId })

export const approveInterTeamTradeGroup = (interTeamTradeGroupId: string) =>
  ({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE, interTeamTradeGroupId })

export const declineInterTeamTradeGroup = (interTeamTradeGroupId: string) =>
  ({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE, interTeamTradeGroupId })

export const addToInterTeamTradeGroup = (inListPosition: ListPosition) =>
  ({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE, inListPosition })

export const removeTrade = (interTeamTradeId: string) =>
  ({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE, interTeamTradeId})
