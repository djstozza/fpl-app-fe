export const API_TEAMS_SHOW = 'API_TEAMS_SHOW'
export const FETCH_TEAM_PLAYERS = 'FETCH_TEAM_PLAYERS'
export const API_TEAMS_FIXTURES_INDEX = 'API_TEAMS_FIXTURES_INDEX'
export const UPDATE_TEAM_QUERY = 'UPDATE_TEAM_QUERY'
export const UPDATE_TEAM_PLAYERS_QUERY = 'UPDATE_TEAM_PLAYERS_QUERY'
export const UPDATE_SORT = 'UPDATE_SORT'

export const fetchTeam = (teamId: string, tab: string, sort: Object) => ({ type: API_TEAMS_SHOW, teamId, tab, sort })

export const fetchTeamFixtures = (teamId: string, tab: string, fixturesSortParams: Object, method?: string) =>
  ({ type: API_TEAMS_FIXTURES_INDEX, teamId, tab, fixturesSortParams, method })

export const fetchTeamPlayers = (teamId: string, tab: string, playersSortParams: Object, method?: string) =>
  ({ type: FETCH_TEAM_PLAYERS, teamId, tab, playersSortParams, method })

export const updateTeamQuery = (teamId: string, tab: string, newSort: Object) =>
  ({ type: UPDATE_TEAM_QUERY, teamId, tab, newSort })
