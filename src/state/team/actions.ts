export const API_TEAMS_SHOW = 'API_TEAMS_SHOW'

type Props = {
  teamId: string
}

export const fetchTeam = (teamId: string) => ({ type: API_TEAMS_SHOW, teamId })
