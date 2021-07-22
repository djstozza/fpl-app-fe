import { put, takeLatest, all, select } from 'redux-saga/effects'
import { decamelizeKeys } from 'humps'

import history from 'state/history'

import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import { fetchListPositions } from 'state/fplTeamList/actions'

import {
  API_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAM_LISTS_PATH,
  API_LIST_POSITIONS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

function * creatTrade (action) : Generator <any, any, any> {
  const { outListPosition: { id } } = yield select(state => state.fplTeamList)
  const { inPlayerId } = action

  const url = `${API_URL}${API_LIST_POSITIONS_PATH}/${id}/trades`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'POST',
    url,
    body: { trade: decamelizeKeys({ inPlayerId }) },
    successAction: success(actions.API_LIST_POSITION_TRADES_CREATE),
    failureAction: failure(actions.API_LIST_POSITION_TRADES_CREATE)
  })
}

function * fetchTrades (action) : Generator <any, any, any> {
  const { fplTeamListId } = action

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/trades`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_FPL_TEAM_LIST_TRADES_INDEX),
    failureAction: failure(actions.API_FPL_TEAM_LIST_TRADES_INDEX)
  })
}

function * creatTradeSuccess (action) : Generator<any, any, any> {
  const { data: { id: fplTeamListId } } = yield select(state => state.fplTeamList)
  const { data: { id: fplTeamId } } = yield select(state => state.fplTeam)

  yield all([
    put(fetchListPositions(fplTeamListId)),
    history.replace(`${FPL_TEAMS_URL}/${fplTeamId}/trades`)
  ])
}

export default function * tradesSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_LIST_POSITION_TRADES_CREATE, creatTrade),
    yield takeLatest(actions.API_FPL_TEAM_LIST_TRADES_INDEX, fetchTrades),
    yield takeLatest(success(actions.API_LIST_POSITION_TRADES_CREATE), creatTradeSuccess)
  ])
}
