import { put, takeLatest, takeEvery, all, fork, select } from 'redux-saga/effects'
import qs from 'qs'
import { decamelizeKeys } from 'humps'

import { API_URL, TEAMS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'

const defaultSortQuery = {
  position: 'asc'
}

function * fetchTeams (action) : Generator<any, any, any> {
  const sortQuery = Object.keys(action.sort).length > 0 ? action.sort : defaultSortQuery

  const query = {
    sort: sortQuery
  }

  history.push(`${TEAMS_URL}?${qs.stringify(query)}`)

  const url = `${API_URL}${TEAMS_URL}?${qs.stringify(decamelizeKeys(query))}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_TEAMS_INDEX),
    failureAction: failure(actions.API_TEAMS_INDEX)
  })
}

function * watchFetchTeams () : Generator<any, any, any> {
  yield takeLatest([
    actions.API_TEAMS_INDEX
  ], fetchTeams)
}

export default function * teamsSagas () : Generator<any, any, any> {
  yield all([
    fork(watchFetchTeams)
  ])
}
