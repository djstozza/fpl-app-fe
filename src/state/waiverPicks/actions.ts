export const API_LIST_POSITION_WAIVER_PICKS_CREATE = 'API_LIST_POSITION_WAIVER_PICKS_CREATE'
export const API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX = 'API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX'
export const API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER = 'API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER'

export const createWaiverPick = (inPlayerId: string) => ({ type: API_LIST_POSITION_WAIVER_PICKS_CREATE, inPlayerId })
export const fetchWaiverPicks = (fplTeamListId: string) =>
  ({ type: API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX, fplTeamListId })
export const changeWaiverPickOrder = (fplTeamListId: string, waiverPickId: string, newPickNumber: string) =>
  ({ type: API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER, fplTeamListId, waiverPickId, newPickNumber })
