export const API_TEAMS_SHOW = 'API_TEAMS_SHOW'
export const FETCH_TEAM_PLAYERS = 'FETCH_TEAM_PLAYERS'
export const API_TEAMS_FIXTURES_INDEX = 'API_TEAMS_FIXTURES_INDEX'
export const UPDATE_SORT = 'UPDATE_SORT'

export const fetchTeam = (teamId: string, tab: string, sort: Object) => ({ type: API_TEAMS_SHOW, teamId, tab, sort })

export const fetchTeamFixtures = (teamId: string, tab: string, fixturesSortParams: Object, method?: string) =>
  ({ type: API_TEAMS_FIXTURES_INDEX, teamId, tab, fixturesSortParams, method })

export const fetchTeamPlayers = (teamId: string, tab: string, playersSortParams: Object, method?: string) =>
  ({ type: FETCH_TEAM_PLAYERS, teamId, tab, playersSortParams, method })

export const updateSort = (sort: Object) => ({ type: UPDATE_SORT, sort })
