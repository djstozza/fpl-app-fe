export const API_LEAGUE_MINI_DRAFT_PICKS_INDEX = 'API_LEAGUE_MINI_DRAFT_PICKS_INDEX'
export const API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX = 'API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX'
export const API_LEAGUE_MINI_DRAFT_PICK_CREATE = 'API_LEAGUE_MINI_DRAFT_PICK_CREATE'
export const API_LEAGUE_MINI_DRAFT_PICK_PASS = 'API_LEAGUE_MINI_DRAFT_PICK_PASS'
export const API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX = 'API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX'
export const UPDATE_MINI_DRAFT_PICKS_FILTER = 'UPDATE_MINI_DRAFT_PICKS_FILTER'
export const UPDATE_MINI_DRAFT_PICKS_SORT = 'UPDATE_MINI_DRAFT_PICKS_SORT'
export const MINI_DRAFT_FETCH_TRADEABLE_PLAYERS = 'MINI_DRAFT_FETCH_TRADEABLE_PLAYERS'
export const MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_FILTER = 'MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_FILTER'
export const MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_SORT = 'MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_SORT'
export const MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_PAGE = 'MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_PAG'

type Props = {
  filter?: Object,
  sort?: Object,
  page?: Object
}

export const fetchMiniDraftPicks = ({ sort, filter }: Props) =>
  ({ type: API_LEAGUE_MINI_DRAFT_PICKS_INDEX, sort, filter })

export const fetchMiniDraftPicksStatus = (leagueId: string) => ({ type: API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX, leagueId })
export const fetchMiniDraftPickFacets = () => ({ type: API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX })

export const updateFilter = (filter: Object) => ({ type: UPDATE_MINI_DRAFT_PICKS_FILTER, filter })
export const updateSort = (sort: Object) => ({ type: UPDATE_MINI_DRAFT_PICKS_SORT, sort })
export const createMiniDraftPick = (inPlayerId: string) => ({ type: API_LEAGUE_MINI_DRAFT_PICK_CREATE, inPlayerId })
export const passMiniDraftPick = () => ({ type: API_LEAGUE_MINI_DRAFT_PICK_PASS })

export const fetchTradeablePlayers = ({ sort, filter, page }: Props) => ({
  type: MINI_DRAFT_FETCH_TRADEABLE_PLAYERS,
  sort,
  filter,
  page
})

export const updateTradeablePlayersFilter = (filter: Object) =>
  ({ type: MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_FILTER, filter })
export const updateTradeablePlayersSort = (sort: Object) =>
  ({ type: MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_SORT, sort })
export const updateTradeablePlayersPage = (offset: string) =>
  ({ type: MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_PAGE, offset })
