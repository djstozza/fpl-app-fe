export const API_PLAYERS_INDEX = 'API_PLAYER_INDEX'

type Props = {

  filter: Object,
  sort?: Object,
  updateUrl?: boolean
}

export const fetchPlayers = ({ sort, filter, updateUrl }: Props) => ({ type: API_PLAYERS_INDEX, sort, filter, updateUrl })
