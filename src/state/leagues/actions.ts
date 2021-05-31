export const API_LEAGUES_INDEX = 'API_LEAGUES_INDEX'
export const API_LEAGUES_CREATE = 'API_LEAGUES_CREATE'

type CreateLeagueProps = {
  name: string,
  code: string,
  fplTeamName: string
}

export const fetchLeagues = () => ({ type: API_LEAGUES_INDEX })
export const createLeague = ({ league }) => ({ type: API_LEAGUES_CREATE, league })
