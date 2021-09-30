export const API_PLAYERS_SHOW = 'API_PLAYERS_SHOW'
export const API_PLAYERS_HISTORY_INDEX = 'API_PLAYERS_HISTORY_INDEX'
export const API_PLAYERS_HISTORY_PAST_INDEX = 'API_PLAYERS_HISTORY_PAST_INDEX'
export const UPDATE_PLAYER_HISTORY_SORT = 'UPDATE_PLAYER_HISTORY_SORT'
export const UPDATE_PLAYER_HISTORY_PAST_SORT = 'UPDATE_PLAYER_HISTORY_PAST_SORT'

type Props = {
  id: string,
  sort: Object
}

export const fetchPlayer = (playerId: string) =>
  ({ type: API_PLAYERS_SHOW, playerId })

export const fetchPlayerHistory = ({ id: playerId, sort }: Props) =>
  ({ type: API_PLAYERS_HISTORY_INDEX, playerId, sort })

export const fetchPlayerHistoryPast = ({ id: playerId, sort }: Props) =>
  ({ type: API_PLAYERS_HISTORY_PAST_INDEX, playerId, sort })

export const updatePlayerHistorySort = ({ sort }: Props) =>
  ({ type: UPDATE_PLAYER_HISTORY_SORT, sort })

export const updatePlayerHistoryPastSort = ({ sort }: Props) =>
  ({ type: UPDATE_PLAYER_HISTORY_PAST_SORT, sort })
