export const API_LEAGUES_SHOW = 'API_LEAGUES_SHOW'
export const API_LEAGUES_UPDATE = 'API_LEAGUES_UPDATE'
export const API_LEAGUE_FPL_TEAMS_INDEX = 'API_LEAGUE_FPL_TEAMS_INDEX'
export const API_LEAGUE_GENERATE_DRAFT_PICKS = 'API_LEAGUE_GENERATE_DRAFT_PICKS'
export const API_LEAGUE_CREATE_DRAFT = 'API_LEAGUE_CREATE_DRAFT'
export const UPDATE_LEAGUE_FPL_TEAMS_SORT = 'UPDATE_LEAGUE_FPL_TEAMS_SORT'
export const FETCH_AVAILABLE_PLAYERS = 'FETCH_AVAILABLE_PLAYERS'
export const UPDATE_AVAILABLE_PLAYERS_SORT = 'UPDATE_AVAILABLE_PLAYERS_SORT'
export const UPDATE_AVAILABLE_PLAYERS_FILTER = 'UPDATE_AVAILABLE_PLAYERS_FILTER'
export const UPDATE_AVAILABLE_PLAYERS_PAGE = 'UPDATE_AVAILABLE_PLAYERS_PAGE'
export const INITIALIZE_FORM = 'INITIALIZE_FORM'

type Props = {
  league: {
    name: string,
    code: string
  }
}

type AvailablePlayersProps = {
  filter?: Object,
  sort?: Object,
  page?: Object
}

export const fetchLeague = (leagueId: string) => ({ type: API_LEAGUES_SHOW, leagueId })
export const updateLeague = ({ league }: Props) => ({ type: API_LEAGUES_UPDATE, league })
export const fetchFplTeams = ({ sort }) => ({ type: API_LEAGUE_FPL_TEAMS_INDEX, sort })
export const generateDraftPicks = (leagueId: string) => ({ type: API_LEAGUE_GENERATE_DRAFT_PICKS, leagueId })
export const updateFplTeamsSort = ({ sort }:{ sort: Object }) => ({ type: UPDATE_LEAGUE_FPL_TEAMS_SORT, sort })
export const createDraft = (leagueId: string) => ({ type: API_LEAGUE_CREATE_DRAFT, leagueId })
export const fetchAvailablePlayers = ({ sort, filter, page }: AvailablePlayersProps) => ({
  type: FETCH_AVAILABLE_PLAYERS,
  sort,
  filter,
  page
})
export const updateAvailablePlayersFilter = (filter: Object) => ({ type: UPDATE_AVAILABLE_PLAYERS_FILTER, filter })
export const updateAvailablePlayersSort = (sort: Object) => ({ type: UPDATE_AVAILABLE_PLAYERS_SORT, sort })
export const updateAvailablePlayersPage = (offset: string) => ({ type: UPDATE_AVAILABLE_PLAYERS_PAGE, offset })
export const initializeForm = () => ({ type: INITIALIZE_FORM })
