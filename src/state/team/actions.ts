export const API_TEAMS_SHOW = 'API_TEAMS_SHOW'
export const FETCH_TEAM_PLAYERS = 'FETCH_TEAM_PLAYERS'

export const fetchTeam = (teamId: string) => ({ type: API_TEAMS_SHOW, teamId })

export const fetchTeamPlayers = (teamId: string, sort: Object) => ({ type: FETCH_TEAM_PLAYERS, teamId, sort })
