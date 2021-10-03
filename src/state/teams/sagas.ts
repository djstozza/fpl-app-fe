import { put, takeLatest, all } from 'redux-saga/effects'
import qs from 'qs'
import { decamelizeKeys } from 'humps'

import { API_URL, TEAMS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'

export function * fetchTeams (action) : Generator<any, any, any> {
  const { sort } = action

  const query = {
    sort
  }

  const url = `${API_URL}${TEAMS_URL}?${qs.stringify(decamelizeKeys(query))}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_TEAMS_INDEX),
    failureAction: failure(actions.API_TEAMS_INDEX)
  })
}

export function * updateSort (action) : Generator<any, any, any> {
  const { sort } = action

  const query = {
    sort
  }

  yield history.push(`${TEAMS_URL}?${qs.stringify(query)}`)
}

export default function * teamsSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest([actions.API_TEAMS_INDEX], fetchTeams),
    yield takeLatest([actions.UPDATE_TEAMS_SORT], updateSort)
  ])
}
