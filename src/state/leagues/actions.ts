export const API_LEAGUES_INDEX = 'API_LEAGUES_INDEX'
export const API_LEAGUES_CREATE = 'API_LEAGUES_CREATE'
export const UPDATE_LEAGUES_SORT = 'UPDATE_LEAGUES_SORT'

type CreateLeagueProps = {
  name: string,
  code: string,
  fplTeamName: string
}

export const fetchLeagues = () => ({ type: API_LEAGUES_INDEX })
export const createLeague = ({ league }:{ league: CreateLeagueProps }) => ({ type: API_LEAGUES_CREATE, league })
export const updateSort = (sort: Object) => ({ type: UPDATE_LEAGUES_SORT, sort })
