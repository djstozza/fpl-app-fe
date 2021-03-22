import { put, takeLatest, takeEvery, all, fork, select } from 'redux-saga/effects'

import { API_URL, TEAMS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'

function * fetchTeam (action) : Generator<any, any, any> {
  const { teamId } = action
  const url = `${API_URL}${TEAMS_URL}/${teamId}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_TEAMS_SHOW),
    failureAction: failure(actions.API_TEAMS_SHOW)
  })
}

function * watchFetchTeam () : Generator<any, any, any> {
  yield takeLatest([
    actions.API_TEAMS_SHOW
  ], fetchTeam)
}

export default function * teamSagas () : Generator<any, any, any> {
  yield all([
    fork(watchFetchTeam)
  ])
}
