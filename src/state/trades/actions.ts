export const API_LIST_POSITION_TRADES_CREATE = 'API_LIST_POSITION_TRADES_CREATE'
export const API_FPL_TEAM_LIST_TRADES_INDEX = 'API_FPL_TEAM_LIST_TRADES_INDEX'
export const API_FPL_TEAM_LSIT_TRADES_CHANGE_ORDER = 'API_FPL_TEAM_LSIT_TRADES_CHANGE_ORDER'

export const createTrade = (inPlayerId: string) => ({ type: API_LIST_POSITION_TRADES_CREATE, inPlayerId })
export const fetchTrades = (fplTeamListId: string) =>
  ({ type: API_FPL_TEAM_LIST_TRADES_INDEX, fplTeamListId })
