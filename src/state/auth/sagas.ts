import { put, takeLatest, all } from 'redux-saga/effects'
import { decamelizeKeys } from 'humps'

import { API_URL, API_SESSIONS_PATH, API_REGISTRATIONS_PATH } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'

function * logIn (action) : Generator<any, any, any> {
  const { user } = action

  const url = `${API_URL}${API_SESSIONS_PATH}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'POST',
    body: decamelizeKeys(user),
    url,
    successAction: success(actions.API_SESSIONS_CREATE),
    failureAction: failure(actions.API_SESSIONS_CREATE)
  })
}

function * signUp (action) : Generator<any, any, any> {
  const { user } = action

  const url = `${API_URL}${API_REGISTRATIONS_PATH}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'POST',
    body: decamelizeKeys(user),
    url,
    successAction: success(actions.API_USERS_CREATE),
    failureAction: failure(actions.API_USERS_CREATE)
  })
}

export default function * teamsSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest([actions.API_SESSIONS_CREATE], logIn),
    yield takeLatest([actions.API_USERS_CREATE], signUp)
  ])
}
