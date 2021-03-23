export const API_TEAMS_SHOW = 'API_TEAMS_SHOW'

export const fetchTeam = (teamId: string) => ({ type: API_TEAMS_SHOW, teamId })
