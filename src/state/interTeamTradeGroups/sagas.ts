import { put, takeLatest, all, select } from 'redux-saga/effects'
import { decamelizeKeys } from 'humps'

import history from 'state/history'

import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import { fetchListPositions, setOutListPosition } from 'state/fplTeamList/actions'

import {
  API_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAM_LISTS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

export function * fetchInterTeamTradeGroups (action) : Generator <any, any, any> {
  const { fplTeamListId } = action

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS),
    failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS)
  })
}

export function * createInterTeamTradeGroup (action) : Generator <any, any, any> {
  const {
    data: { id },
    outListPosition: { player: { id: outPlayerId } },
  } = yield select(state => state.fplTeamList)
  const { inListPosition: { player: { id: inPlayerId }, fplTeamListId: inFplTeamListId } } = action

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${id}/inter_team_trade_groups`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'POST',
    url,
    body: { inter_team_trade_group: decamelizeKeys({ inFplTeamListId, inPlayerId, outPlayerId }) },
    successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE),
    failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE)
  })
}

export function * interTeamTradeGroupSuccess (action) : Generator <any, any, any> {
  const { data: { id } } = yield select(state => state.fplTeam)

  yield all([
    put(setOutListPosition(undefined)),
    history.replace(`${FPL_TEAMS_URL}/${id}/teamTrades`)
  ])
}

export function * submitInterTeamTradeGroup (action) : Generator <any, any, any> {
  const { data: { id } } = yield select(state => state.fplTeamList)
  const { interTeamTradeGroupId } = action

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${id}/inter_team_trade_groups/${interTeamTradeGroupId}/submit`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'POST',
    url,
    successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT),
    failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT)
  })
}

export function * addToInterTeamTradeGroup (action) : Generator <any, any, any> {
  const {
    data: { id },
    outListPosition: { player: { id: outPlayerId } }
  } = yield select(state => state.fplTeamList)
  const { data: { id: interTeamTradeGroupId } } = yield select(state => state.interTeamTradeGroup)
  const { inListPosition: { player: { id: inPlayerId } } } = action

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${id}/inter_team_trade_groups/${interTeamTradeGroupId}/add_trade`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'POST',
    url,
    body: { inter_team_trade_group: decamelizeKeys({ inPlayerId, outPlayerId }) },
    successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE),
    failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE)
  })
}

export function * cancelInterTeamTradeGroup (action) : Generator <any, any, any> {
  const { data: { id } } = yield select(state => state.fplTeamList)
  const { interTeamTradeGroupId } = action

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${id}/inter_team_trade_groups/${interTeamTradeGroupId}/cancel`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'POST',
    url,
    successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL),
    failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL)
  })
}

export function * approveInterTeamTradeGroup (action) : Generator <any, any, any> {
  const { data: { id } } = yield select(state => state.fplTeamList)
  const { interTeamTradeGroupId } = action

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${id}/inter_team_trade_groups/${interTeamTradeGroupId}/approve`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'POST',
    url,
    successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE),
    failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE)
  })
}

export function * declineInterTeamTradeGroup (action) : Generator <any, any, any> {
  const { data: { id } } = yield select(state => state.fplTeamList)
  const { interTeamTradeGroupId } = action

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${id}/inter_team_trade_groups/${interTeamTradeGroupId}/decline`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'POST',
    url,
    successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE),
    failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE)
  })
}

export function * removeTrade (action) : Generator <any, any, any> {
  const { data: { id } } = yield select(state => state.fplTeamList)
  const { interTeamTradeId } = action

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${id}/inter_team_trades/${interTeamTradeId}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'DELETE',
    url,
    successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE),
    failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE)
  })
}

export function * approveInterTeamTradeGroupSuccess (action) : Generator <any, any, any> {
  const { data: { id: fplTeamListId } } = yield select(state => state.fplTeamList)

  yield all([
    put(fetchListPositions(fplTeamListId)),
    put(setOutListPosition(undefined))
  ])
}

export default function * interTeamTradeGroupsSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS, fetchInterTeamTradeGroups),
    yield takeLatest(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE, createInterTeamTradeGroup),
    yield takeLatest(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE, addToInterTeamTradeGroup),
    yield takeLatest(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL, cancelInterTeamTradeGroup),
    yield takeLatest(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT, submitInterTeamTradeGroup),
    yield takeLatest(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE, approveInterTeamTradeGroup),
    yield takeLatest(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE, declineInterTeamTradeGroup),
    yield takeLatest(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE, removeTrade),
    yield takeLatest(
      [
        success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE),
        success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE),
        success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE),
      ], interTeamTradeGroupSuccess
    ),
    yield takeLatest(
      success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE),
      approveInterTeamTradeGroupSuccess
    )
  ])
}
