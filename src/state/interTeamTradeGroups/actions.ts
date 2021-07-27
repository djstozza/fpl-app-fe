import { ListPosition } from 'types'

export const API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE'

export const createInterTeamTradeGroup = (inListPosition: ListPosition) =>
  ({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE, inListPosition })
