export const API_PLAYERS_INDEX = 'API_PLAYERS_INDEX'
export const API_PLAYERS_FACETS_INDEX = 'API_PLAYERS_FACETS_INDEX'

type Props = {
  filter: Object,
  sort?: Object,
  method?: 'push' | 'replace'
}

export const fetchPlayers = ({ sort, filter, method }: Props) => ({ type: API_PLAYERS_INDEX, sort, filter, method })
export const fetchFacets = () => ({ type: API_PLAYERS_FACETS_INDEX })
