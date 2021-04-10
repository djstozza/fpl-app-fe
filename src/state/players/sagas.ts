import { put, takeLatest, takeEvery, all, fork, select } from 'redux-saga/effects'
import qs from 'qs'
import { stringify } from 'utilities/helpers'

import { API_URL, PLAYERS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'

const defaultSortQuery = {
  totalPoints: 'desc'
}

function * fetchPlayers (action) : Generator<any, any, any> {
  const { filter, sort, method } = action

  const sortQuery = !Object.keys(sort).length ? defaultSortQuery : sort

  const query = {
    filter,
    sort: sortQuery
  }

  if (method) history[method](`${PLAYERS_URL}?${qs.stringify(query)}`)

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

export default function * playersSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest([actions.API_PLAYERS_INDEX], fetchPlayers),
    yield takeLatest([actions.API_PLAYERS_FACETS_INDEX], fetchFacets)
  ])
}
