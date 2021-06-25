export const API_FPL_TEAMS_INDEX = 'API_FPL_TEAMS_INDEX'
export const UPDATE_FPL_TEAMS_SORT = 'UPDATE_FPL_TEAMS_SORT'

export const fetchFplTeams = () => ({ type: API_FPL_TEAMS_INDEX })
export const updateFplTeamsSort = (sort: Object) => ({ type: UPDATE_FPL_TEAMS_SORT, sort })
