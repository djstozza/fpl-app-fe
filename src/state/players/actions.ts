export const API_PLAYERS_INDEX = 'API_PLAYERS_INDEX'
export const API_PLAYERS_FACETS_INDEX = 'API_PLAYERS_FACETS_INDEX'
export const UPDATE_PLAYERS_QUERY = 'UPDATE_PLAYERS_QUERY'
export const SET_PLAYERS_PARAMS = 'SET_PLAYERS_PARAMS'
export const SET_PLAYERS_QUERY = 'SET_PLAYERS_QUERY'
export const UPDATE_PLAYERS_FILTER = 'UPDATE_PLAYERS_FILTER'
export const UPDATE_PLAYERS_SORT = 'UPDATE_PLAYERS_SORT'
export const UPDATE_PLAYERS_PAGE = 'UPDATE_PLAYERS_PAGE'


type Props = {
  filter?: Object,
  sort?: Object,
  updateUrl?: boolean,
  page?: Object
}

export const fetchPlayers = ({ sort, filter, page }: Props) => ({
  type: API_PLAYERS_INDEX,
  sort,
  filter,
  page,
})

export const fetchFacets = () => ({ type: API_PLAYERS_FACETS_INDEX })

export const updateFilter = (filter: Object) => ({ type: UPDATE_PLAYERS_FILTER, filter })
export const updateSort = (sort: Object) => ({ type: UPDATE_PLAYERS_SORT, sort })
export const updatePage = (offset: string) => ({ type: UPDATE_PLAYERS_PAGE, offset })
