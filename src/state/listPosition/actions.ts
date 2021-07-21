type AvailablePlayersProps = {
  filter?: Object,
  sort?: Object,
  page?: Object
}

export const API_LIST_POSITION_SHOW = 'API_LIST_POSITION_SHOW'
export const CLEAR_VALID_SUBSTITUTIONS = 'CLEAR_VALID_SUBSTITUTIONS'
export const SET_OUT_LIST_POSITION = 'SET_OUT_LIST_POSITION'

export const FETCH_TRADEABLE_PLAYERS = 'FETCH_TRADEABLE_PLAYERS'
export const UPDATE_TRADEABLE_PLAYERS_SORT = 'UPDATE_TRADEABLE_PLAYERS_SORT'
export const UPDATE_TRADEABLE_PLAYERS_FILTER = 'UPDATE_TRADEABLE_PLAYERS_FILTER'
export const UPDATE_TRADEABLE_PLAYERS_PAGE = 'UPDATE_TRADEABLE_PLAYERS_PAGE'

export const fetchTradeablePlayers = ({ sort, filter, page }: AvailablePlayersProps) => ({
  type: FETCH_TRADEABLE_PLAYERS,
  sort,
  filter,
  page
})

export const fetchValidSubstitutions = (listPositionId: string) => ({ type: API_LIST_POSITION_SHOW, listPositionId })
export const clearValidSubstitutions = () => ({ type: CLEAR_VALID_SUBSTITUTIONS })

export const updateTradeablePlayersFilter = (filter: Object) => ({ type: UPDATE_TRADEABLE_PLAYERS_FILTER, filter })
export const updateTradeablePlayersSort = (sort: Object) => ({ type: UPDATE_TRADEABLE_PLAYERS_SORT, sort })
export const updateTradeablePlayersPage = (offset: string) => ({ type: UPDATE_TRADEABLE_PLAYERS_PAGE, offset })
