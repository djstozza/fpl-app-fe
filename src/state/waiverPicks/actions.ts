import { decamelizeKeys } from 'humps'

import history from 'state/history'
import { apiRequest } from 'state/request/actions'

import {
  API_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAM_LISTS_PATH,
  API_LIST_POSITIONS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

export const API_LIST_POSITION_WAIVER_PICKS_CREATE = 'API_LIST_POSITION_WAIVER_PICKS_CREATE'
export const API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX = 'API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX'
export const API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER = 'API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER'

export const createWaiverPick = (inPlayerId: string) => async (dispatch, getState) => {
  dispatch({ type: API_LIST_POSITION_WAIVER_PICKS_CREATE, inPlayerId })

  const { outListPosition: { id } } = getState().fplTeamList
  const url = `${API_URL}${API_LIST_POSITIONS_PATH}/${id}/waiver_picks`

  const ok = await dispatch(apiRequest({
    needsAuth: true,
    method: 'POST',
    url,
    body: { waiver_pick: decamelizeKeys({ inPlayerId }) },
    successAction: success(API_LIST_POSITION_WAIVER_PICKS_CREATE),
    failureAction: failure(API_LIST_POSITION_WAIVER_PICKS_CREATE)
  }))

  if (ok) {
    const { data: { id: fplTeamId } } = getState().fplTeam
    history.replace(`${FPL_TEAMS_URL}/${fplTeamId}/waiverPicks`)
  }
}

export const fetchWaiverPicks = (fplTeamListId: string) => (dispatch) => {
  dispatch({ type: API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX, fplTeamListId })

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/waiver_picks`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url,
    successAction: success(API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX),
    failureAction: failure(API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX)
  }))
}

export const changeWaiverPickOrder = (fplTeamListId: string, waiverPickId: string, newPickNumber: string) =>
  (dispatch) => {
    dispatch({ type: API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER, fplTeamListId, waiverPickId, newPickNumber })

    const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/waiver_picks/${waiverPickId}/change_order`

    return dispatch(apiRequest({
      needsAuth: true,
      method: 'POST',
      url,
      body: { waiver_pick: decamelizeKeys({ newPickNumber }) },
      successAction: success(API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER),
      failureAction: failure(API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER)
    }))
  }
