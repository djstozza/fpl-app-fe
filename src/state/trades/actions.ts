import { decamelizeKeys } from 'humps'

import history from 'state/history'
import { apiRequest } from 'state/request/actions'
import { fetchListPositions } from 'state/fplTeamList/actions'

import {
  API_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAM_LISTS_PATH,
  API_LIST_POSITIONS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

export const API_LIST_POSITION_TRADES_CREATE = 'API_LIST_POSITION_TRADES_CREATE'
export const API_FPL_TEAM_LIST_TRADES_INDEX = 'API_FPL_TEAM_LIST_TRADES_INDEX'
export const API_FPL_TEAM_LSIT_TRADES_CHANGE_ORDER = 'API_FPL_TEAM_LSIT_TRADES_CHANGE_ORDER'

export const createTrade = (inPlayerId: string) => async (dispatch, getState) => {
  dispatch({ type: API_LIST_POSITION_TRADES_CREATE, inPlayerId })

  const { outListPosition: { id } } = getState().fplTeamList
  const url = `${API_URL}${API_LIST_POSITIONS_PATH}/${id}/trades`

  const ok = await dispatch(apiRequest({
    needsAuth: true,
    method: 'POST',
    url,
    body: { trade: decamelizeKeys({ inPlayerId }) },
    successAction: success(API_LIST_POSITION_TRADES_CREATE),
    failureAction: failure(API_LIST_POSITION_TRADES_CREATE)
  }))

  if (ok) {
    const { data: { id: fplTeamListId } } = getState().fplTeamList
    const { data: { id: fplTeamId } } = getState().fplTeam

    dispatch(fetchListPositions(fplTeamListId))
    history.replace(`${FPL_TEAMS_URL}/${fplTeamId}/trades`)
  }
}

export const fetchTrades = (fplTeamListId: string) => (dispatch, _getState) => {
  dispatch({ type: API_FPL_TEAM_LIST_TRADES_INDEX, fplTeamListId })

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/trades`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url,
    successAction: success(API_FPL_TEAM_LIST_TRADES_INDEX),
    failureAction: failure(API_FPL_TEAM_LIST_TRADES_INDEX)
  }))
}
