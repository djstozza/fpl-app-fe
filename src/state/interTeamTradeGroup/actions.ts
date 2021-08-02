export const API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP'

export const fetchInterTeamTradeGroup = (fplTeamListId: string, interTeamTradeGroupId: string) =>
  ({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP, fplTeamListId, interTeamTradeGroupId })
