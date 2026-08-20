import { decamelizeKeys } from 'humps'

import history from 'state/history'
import { apiRequest } from 'state/request/actions'
import { fetchListPositions, setOutListPosition } from 'state/fplTeamList/actions'

import {
  API_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAM_LISTS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

import type { ListPosition } from 'types'

export const API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS'
export const API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE'
export const API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT'
export const API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE'
export const API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL'
export const API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE'
export const API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE'
export const API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE'

export const fetchInterTeamTradeGroups = (fplTeamListId: string) => (dispatch) => {
  dispatch({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS, fplTeamListId })

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url,
    successAction: success(API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS),
    failureAction: failure(API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS)
  }))
}

const interTeamTradeGroupSuccess = () => (dispatch, getState) => {
  const { data: { id } } = getState().fplTeam

  dispatch(setOutListPosition(undefined))
  history.replace(`${FPL_TEAMS_URL}/${id}/teamTrades`)
}

export const createInterTeamTradeGroup = (inListPosition: ListPosition) => async (dispatch, getState) => {
  dispatch({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE, inListPosition })

  const {
    data: { id },
    outListPosition: { player: { id: outPlayerId } }
  } = getState().fplTeamList
  const { player: { id: inPlayerId } } = inListPosition

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${id}/inter_team_trade_groups`

  const ok = await dispatch(apiRequest({
    needsAuth: true,
    method: 'POST',
    url,
    body: { inter_team_trade_group: decamelizeKeys({ inPlayerId, outPlayerId }) },
    successAction: success(API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE),
    failureAction: failure(API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE)
  }))

  if (ok) interTeamTradeGroupSuccess()(dispatch, getState)
}

export const submitInterTeamTradeGroup = (interTeamTradeGroupId: string) => (dispatch, getState) => {
  dispatch({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT, interTeamTradeGroupId })

  const { data: { id } } = getState().fplTeamList
  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${id}/inter_team_trade_groups/${interTeamTradeGroupId}/submit`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'POST',
    url,
    successAction: success(API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT),
    failureAction: failure(API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT)
  }))
}

export const addToInterTeamTradeGroup = (inListPosition: ListPosition) => async (dispatch, getState) => {
  dispatch({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE, inListPosition })

  const {
    data: { id },
    outListPosition: { player: { id: outPlayerId } }
  } = getState().fplTeamList
  const { data: { id: interTeamTradeGroupId } } = getState().interTeamTradeGroup
  const { player: { id: inPlayerId } } = inListPosition

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${id}/inter_team_trade_groups/${interTeamTradeGroupId}/add_trade`

  const ok = await dispatch(apiRequest({
    needsAuth: true,
    method: 'POST',
    url,
    body: { inter_team_trade_group: decamelizeKeys({ inPlayerId, outPlayerId }) },
    successAction: success(API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE),
    failureAction: failure(API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE)
  }))

  if (ok) interTeamTradeGroupSuccess()(dispatch, getState)
}

export const cancelInterTeamTradeGroup = (interTeamTradeGroupId: string) => (dispatch, getState) => {
  dispatch({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL, interTeamTradeGroupId })

  const { data: { id } } = getState().fplTeamList
  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${id}/inter_team_trade_groups/${interTeamTradeGroupId}/cancel`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'POST',
    url,
    successAction: success(API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL),
    failureAction: failure(API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL)
  }))
}

const approveInterTeamTradeGroupSuccess = () => (dispatch, getState) => {
  const { data: { id: fplTeamListId } } = getState().fplTeamList

  dispatch(fetchListPositions(fplTeamListId))
  dispatch(setOutListPosition(undefined))
}

export const approveInterTeamTradeGroup = (interTeamTradeGroupId: string) => async (dispatch, getState) => {
  dispatch({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE, interTeamTradeGroupId })

  const { data: { id } } = getState().fplTeamList
  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${id}/inter_team_trade_groups/${interTeamTradeGroupId}/approve`

  const ok = await dispatch(apiRequest({
    needsAuth: true,
    method: 'POST',
    url,
    successAction: success(API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE),
    failureAction: failure(API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE)
  }))

  if (ok) approveInterTeamTradeGroupSuccess()(dispatch, getState)
}

export const declineInterTeamTradeGroup = (interTeamTradeGroupId: string) => (dispatch, getState) => {
  dispatch({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE, interTeamTradeGroupId })

  const { data: { id } } = getState().fplTeamList
  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${id}/inter_team_trade_groups/${interTeamTradeGroupId}/decline`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'POST',
    url,
    successAction: success(API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE),
    failureAction: failure(API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE)
  }))
}

export const removeTrade = (interTeamTradeId: string) => async (dispatch, getState) => {
  dispatch({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE, interTeamTradeId })

  const { data: { id } } = getState().fplTeamList
  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${id}/inter_team_trades/${interTeamTradeId}`

  const ok = await dispatch(apiRequest({
    needsAuth: true,
    method: 'DELETE',
    url,
    successAction: success(API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE),
    failureAction: failure(API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE)
  }))

  if (ok) interTeamTradeGroupSuccess()(dispatch, getState)
}
