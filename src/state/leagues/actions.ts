export const API_LEAGUES_INDEX = 'API_LEAGUES_INDEX'
export const API_LEAGUES_CREATE = 'API_LEAGUES_CREATE'
export const API_LEAGUES_JOIN = 'API_LEAGUES_JOIN'
export const UPDATE_LEAGUES_SORT = 'UPDATE_LEAGUES_SORT'
export const INITIALIZE_FORM = 'INITIALIZE_FORM'

type LeagueProps = {
  name: string,
  code: string,
  fplTeamName: string
}

export const fetchLeagues = () => ({ type: API_LEAGUES_INDEX })
export const createLeague = ({ league }:{ league: LeagueProps }) => ({ type: API_LEAGUES_CREATE, league })
export const joinLeague = ({ league }:{ league: LeagueProps }) => ({ type: API_LEAGUES_JOIN, league })
export const updateSort = (sort: Object) => ({ type: UPDATE_LEAGUES_SORT, sort })
export const initializeForm = () => ({ type: INITIALIZE_FORM })
