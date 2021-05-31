export const API_PLAYERS_SHOW = 'API_PLAYERS_SHOW'
export const API_PLAYERS_HISTORY_INDEX = 'API_PLAYERS_HISTORY_INDEX'
export const API_PLAYERS_HISTORY_PAST_INDEX = 'API_PLAYERS_HISTORY_PAST_INDEX'
export const UPDATE_PLAYER_HISTORY = 'UPDATE_PLAYER_HISTORY'
export const UPDATE_PLAYER_HISTORY_PAST = 'UPDATE_PLAYER_HISTORY_PAST'

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

export const updatePlayerHistory = ({ sort }: Props) =>
  ({ type: UPDATE_PLAYER_HISTORY, sort })

export const updatePlayerHistoryPast = ({ sort }: Props) =>
  ({ type: UPDATE_PLAYER_HISTORY_PAST, sort })
