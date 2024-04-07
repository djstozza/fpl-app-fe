import { put, takeLatest, all } from 'redux-saga/effects'

import { API_URL, ROUNDS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'

export function * fetchRounds () : Generator<any, any, any> {
  console.log(import.meta.env)
  const url = `${API_URL}${ROUNDS_URL}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_ROUNDS_INDEX),
    failureAction: failure(actions.API_ROUNDS_INDEX)
  })
}

export default function * roundsSagas () : Generator<any, any, any> {
  yield all([
    takeLatest(actions.API_ROUNDS_INDEX, fetchRounds)
  ])
}
