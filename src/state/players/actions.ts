export const API_PLAYERS_INDEX = 'API_PLAYERS_INDEX'
export const API_PLAYERS_FACETS_INDEX = 'API_PLAYERS_FACETS_INDEX'
export const UPDATE_PLAYERS_QUERY = 'UPDATE_PLAYERS_QUERY'


type Props = {
  filter: Object,
  sort?: Object,
  updateUrl?: boolean
}

export const fetchPlayers = ({ sort, filter, updateUrl }: Props) => ({ type: API_PLAYERS_INDEX, sort, filter, updateUrl })
export const fetchFacets = () => ({ type: API_PLAYERS_FACETS_INDEX })
export const updateQuery = ({ sort, filter }: Props) => ({ type: UPDATE_PLAYERS_QUERY, sort, filter })
