import { put, takeLatest, takeEvery, all, fork, select } from 'redux-saga/effects'
import qs from 'qs'
import { stringify } from 'utilities/helpers'

import { API_URL, PLAYERS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'

function * fetchPlayers (action) : Generator<any, any, any> {
  const { filter = {}, sort, updateUrl = true } = action

  const query = {
    filter,
    sort
  }

  if (updateUrl) history.replace(`${PLAYERS_URL}?${qs.stringify(query)}`)

  const url = `${API_URL}${PLAYERS_URL}?${stringify(query)}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_PLAYERS_INDEX),
    failureAction: failure(actions.API_PLAYERS_INDEX)
  })
}

function * fetchFacets (action) : Generator<any, any, any> {
  const url = `${API_URL}${PLAYERS_URL}/facets`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_PLAYERS_FACETS_INDEX),
    failureAction: failure(actions.API_PLAYERS_FACETS_INDEX)
  })
}

function * updateQuery (action) : Generator<any, any, any> {
  const { filter, sort, updateUrl = true } = action

  const query = {
    filter,
    sort
  }

  if (updateUrl) history.push(`${PLAYERS_URL}?${qs.stringify(query)}`)

  yield put({ type: actions.SET_PLAYERS_PARAMS, sort, filter })
}

export default function * playersSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest([actions.API_PLAYERS_INDEX], fetchPlayers),
    yield takeLatest([actions.API_PLAYERS_FACETS_INDEX], fetchFacets),
    yield takeLatest([actions.UPDATE_PLAYERS_QUERY], updateQuery)
  ])
}
