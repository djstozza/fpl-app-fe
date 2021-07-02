export const API_FPL_TEAM_LISTS_SHOW = 'API_FPL_TEAM_LISTS_SHOW'
export const API_FPL_TEAM_LISTS_UPDATE = 'API_FPL_TEAM_LISTS_UPDATE'
export const API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX = 'API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX'

export const fetchFplTeamList = (fplTeamListId: string) =>
  ({ type: API_FPL_TEAM_LISTS_SHOW, fplTeamListId })

export const fetchListPositions = (fplTeamListId: string) =>
  ({ type: API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX, fplTeamListId })

export const processSubstitution = (fplTeamListId: string, outListPositionId: string, inListPositionId: string) =>
  ({ type:  API_FPL_TEAM_LISTS_UPDATE, fplTeamListId, outListPositionId, inListPositionId })
