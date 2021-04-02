export const API_TEAMS_SHOW = 'API_TEAMS_SHOW'
export const FETCH_TEAM_PLAYERS = 'FETCH_TEAM_PLAYERS'
export const API_TEAMS_FIXTURES_INDEX = 'API_TEAMS_FIXTURES_INDEX'
export const UPDATE_SORT = 'UPDATE_SORT'

export const fetchTeam = (teamId: string) => ({ type: API_TEAMS_SHOW, teamId })

export const fetchTeamFixtures = (teamId: string, fixturesSortParams: Object) =>
  ({ type: API_TEAMS_FIXTURES_INDEX, teamId, fixturesSortParams })

export const fetchTeamPlayers = (teamId: string, playersSortParams: Object) =>
  ({ type: FETCH_TEAM_PLAYERS, teamId, playersSortParams })

export const updateSort = (sort: Object) => ({ type: UPDATE_SORT, sort })
