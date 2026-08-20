import qs from 'qs'

import { API_URL, PLAYERS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import { apiRequest } from 'state/request/actions'
import { stringify } from 'utilities/helpers'
import history from 'state/history'

export const API_PLAYERS_SHOW = 'API_PLAYERS_SHOW'
export const API_PLAYERS_HISTORY_INDEX = 'API_PLAYERS_HISTORY_INDEX'
export const API_PLAYERS_HISTORY_PAST_INDEX = 'API_PLAYERS_HISTORY_PAST_INDEX'
export const UPDATE_PLAYER_HISTORY_SORT = 'UPDATE_PLAYER_HISTORY_SORT'
export const UPDATE_PLAYER_HISTORY_PAST_SORT = 'UPDATE_PLAYER_HISTORY_PAST_SORT'

type Props = {
  id: string,
  sort: any
}

export const fetchPlayer = (playerId: string) => (dispatch, _getState) => {
  dispatch({ type: API_PLAYERS_SHOW, playerId })

  return dispatch(apiRequest({
    needsAuth: false,
    method: 'GET',
    url: `${API_URL}${PLAYERS_URL}/${playerId}`,
    successAction: success(API_PLAYERS_SHOW),
    failureAction: failure(API_PLAYERS_SHOW)
  }))
}

export const fetchPlayerHistory = ({ id: playerId, sort }: Props) => (dispatch, _getState) => {
  dispatch({ type: API_PLAYERS_HISTORY_INDEX, playerId, sort })

  const url = `${API_URL}${PLAYERS_URL}/${playerId}/history?${stringify({ sort: sort.history })}`

  return dispatch(apiRequest({
    needsAuth: false,
    method: 'GET',
    url,
    successAction: success(API_PLAYERS_HISTORY_INDEX),
    failureAction: failure(API_PLAYERS_HISTORY_INDEX)
  }))
}

export const fetchPlayerHistoryPast = ({ id: playerId, sort }: Props) => (dispatch, _getState) => {
  dispatch({ type: API_PLAYERS_HISTORY_PAST_INDEX, playerId, sort })

  const url = `${API_URL}${PLAYERS_URL}/${playerId}/history_past?${stringify({ sort: sort.historyPast })}`

  return dispatch(apiRequest({
    needsAuth: false,
    method: 'GET',
    url,
    successAction: success(API_PLAYERS_HISTORY_PAST_INDEX),
    failureAction: failure(API_PLAYERS_HISTORY_PAST_INDEX)
  }))
}

export const updatePlayerHistorySort = ({ sort }: Props) => (dispatch, getState) => {
  dispatch({ type: UPDATE_PLAYER_HISTORY_SORT, sort })

  const { data: { id: playerId } } = getState().player

  history.push(`${PLAYERS_URL}/${playerId}/history?${qs.stringify({ sort: { history: sort } })}`)
}

export const updatePlayerHistoryPastSort = ({ sort }: Props) => (dispatch, getState) => {
  dispatch({ type: UPDATE_PLAYER_HISTORY_PAST_SORT, sort })

  const { data: { id: playerId } } = getState().player

  history.push(`${PLAYERS_URL}/${playerId}/historyPast?${qs.stringify({ sort: { historyPast: sort } })}`)
}
