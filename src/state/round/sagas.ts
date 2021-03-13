import { put, takeLatest, takeEvery, all, fork, select } from 'redux-saga/effects'

import { API_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'

function * fetchRound (action) : Generator<any, any, any> {
  const { roundId } = action
  const url = `${API_URL}/rounds/${roundId}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_ROUNDS_SHOW),
    failureAction: failure(actions.API_ROUNDS_SHOW)
  })
}

function * watchFetchRound () : Generator<any, any, any> {
  yield takeLatest([
    actions.API_ROUNDS_SHOW
  ], fetchRound)
}

export default function * roundSagas () : Generator<any, any, any> {
  yield all([
    fork(watchFetchRound)
  ])
}
