export const API_FPL_TEAMS_SHOW = 'API_FPL_TEAMS_SHOW'
export const API_FPL_TEAMS_UPDATE = 'API_FPL_TEAMS_UPDATE'

type Props = {
  fplTeam: { name: string }
}

export const fetchFplTeam = (fplTeamId: string) => ({ type: API_FPL_TEAMS_SHOW, fplTeamId })
export const updateFplTeam = ({ fplTeam }: Props) => ({ type: API_FPL_TEAMS_UPDATE, fplTeam })
