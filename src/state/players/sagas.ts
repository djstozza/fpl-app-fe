import { put, takeLatest, takeEvery, all, fork, select } from 'redux-saga/effects'
import qs from 'qs'
import { decamelizeKeys } from 'humps'

import { API_URL, PLAYERS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'

const defaultSortQuery = {
  totalPoints: 'desc'
}

function * fetchPlayers (action) : Generator<any, any, any> {
  const { filter, sort, updateUrl } = action

  const sortQuery = sort || defaultSortQuery

  const query = {
    filter,
    sort: sortQuery
  }

  if (updateUrl) history.push(`${PLAYERS_URL}?${qs.stringify(query)}`)

  const url = `${API_URL}${PLAYERS_URL}?${qs.stringify(decamelizeKeys(query))}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_PLAYERS_INDEX),
    failureAction: failure(actions.API_PLAYERS_INDEX)
  })
}

function * watchFetchPlayers () : Generator<any, any, any> {
  yield takeLatest([
    actions.API_PLAYERS_INDEX
  ], fetchPlayers)
}

export default function * playersSagas () : Generator<any, any, any> {
  yield all([
    fork(watchFetchPlayers)
  ])
}
