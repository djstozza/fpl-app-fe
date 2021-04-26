// import type { Sort } from 'types'

export const API_PLAYERS_SHOW = 'API_PLAYERS_SHOW'
export const API_PLAYERS_HISTORY_INDEX = 'API_PLAYERS_HISTORY_INDEX'
export const UPDATE_PLAYER_HISTORY = 'UPDATE_PLAYER_HISTORY'

type Props = {
  playerId: string,
  sort: Object
}

export const fetchPlayer = (playerId: string) =>
  ({ type: API_PLAYERS_SHOW, playerId })

export const fetchPlayerHistory = ({ playerId, sort }: Props) =>
  ({ type: API_PLAYERS_HISTORY_INDEX, playerId, sort })


export const updatePlayerHistory = ({ sort }: Props) =>
  ({ type: UPDATE_PLAYER_HISTORY, sort })
