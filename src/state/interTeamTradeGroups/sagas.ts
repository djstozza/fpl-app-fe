import { put, takeLatest, all, select } from 'redux-saga/effects'
import { decamelizeKeys } from 'humps'

import history from 'state/history'

import * as actions from './actions'
import * as requestActions from 'state/request/actions'

import {
  API_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAM_LISTS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

function * fetchInterTeamTradeGroups (action) : Generator <any, any, any> {
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

function * createInterTeamTradeGroup (action) : Generator <any, any, any> {
  const {
    data: { id },
    outListPosition: { player: { id: outPlayerId = '' } = {} } = {}
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

function * createInterTeamTradeGroupSuccess (action) : Generator <any, any, any> {
  const { data: { id } } = yield select(state => state.fplTeam)

  yield history.replace(`${FPL_TEAMS_URL}/${id}/teamTrades`)
}

function * submitInterTeamTradeGroup (action) : Generator <any, any, any> {
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

function * addToInterTeamTradeGroup (action) : Generator <any, any, any> {
  const {
    data: { id },
    outListPosition: { player: { id: outPlayerId = '' } = {} } = {}
  } = yield select(state => state.fplTeamList)
  const { interTeamTradeGroupId, inListPosition: { player: { id: inPlayerId } } } = action

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

function * cancelInterTeamTradeGroup (action) : Generator <any, any, any> {
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

function * approveInterTeamTradeGroup (action) : Generator <any, any, any> {
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

function * declineInterTeamTradeGroup (action) : Generator <any, any, any> {
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

export default function * waiverPicksSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS, fetchInterTeamTradeGroups),
    yield takeLatest(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE, createInterTeamTradeGroup),
    yield takeLatest(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE, addToInterTeamTradeGroup),
    yield takeLatest(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL, cancelInterTeamTradeGroup),
    yield takeLatest(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT, submitInterTeamTradeGroup),
    yield takeLatest(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE, approveInterTeamTradeGroup),
    yield takeLatest(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE, declineInterTeamTradeGroup),
    yield takeLatest(
      [
        success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE)
      ], createInterTeamTradeGroupSuccess
    )
  ])
}
