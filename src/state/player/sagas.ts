import { put, takeLatest, takeEvery, all, fork, select } from 'redux-saga/effects'
import qs from 'qs'

import { API_URL, PLAYERS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import { stringify } from 'utilities/helpers'
import history from 'state/history'

function * fetchPlayer (action) : Generator<any, any, any> {
  const { playerId } = action

  const url = `${API_URL}${PLAYERS_URL}/${playerId}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_PLAYERS_SHOW),
    failureAction: failure(actions.API_PLAYERS_SHOW)
  })
}

function * fetchPlayerHistory (action) : Generator<any, any, any> {
  const { playerId, sort } = action

  const url = `${API_URL}${PLAYERS_URL}/${playerId}/history?${stringify({ sort })}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_PLAYERS_HISTORY_INDEX),
    failureAction: failure(actions.API_PLAYERS_HISTORY_INDEX)
  })
}

function * updatePlayerHistory (action) : Generator<any, any, any> {
  const { sort } = action
  const { data: { id: playerId } } = yield select(state => state.player)

  yield history.push(`${PLAYERS_URL}/${playerId}/history?${qs.stringify({ sort })}`)
}

export default function * playerSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_PLAYERS_SHOW, fetchPlayer),
    yield takeLatest(actions.API_PLAYERS_HISTORY_INDEX, fetchPlayerHistory),
    yield takeLatest(actions.UPDATE_PLAYER_HISTORY, updatePlayerHistory)
  ])
}
