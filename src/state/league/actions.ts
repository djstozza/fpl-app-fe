export const API_LEAGUES_SHOW = 'API_LEAGUES_SHOW'
export const API_LEAGUES_UPDATE = 'API_LEAGUES_UPDATE'

type Props = {
  league: {
    name: string,
    code: string
  }
}

export const fetchLeague = (leagueId: string) => ({ type: API_LEAGUES_SHOW, leagueId })
export const updateLeague = ({ league }: Props) => ({ type: API_LEAGUES_UPDATE, league })
