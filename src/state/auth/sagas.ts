import { put, takeLatest, all } from 'redux-saga/effects'
import { decamelizeKeys } from 'humps'

import {
  API_URL,
  API_SESSIONS_PATH,
  API_REGISTRATIONS_PATH,
  PROFILE_URL,
  LOGIN_URL
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'
import StateLoader from 'utilities/stateLoader'

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

function * onAuthed (action) : Generator<any, any, any> {
  yield history.replace(PROFILE_URL)
}

function * updateSession (action): Generator<any, any, any> {
  const url = `${API_URL}${API_SESSIONS_PATH}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'PUT',
    url,
    body: {},
    successAction: success(actions.API_SESSIONS_UPDATE),
    failureAction: failure(actions.API_SESSIONS_UPDATE)
  })
}

function * logOut (action): Generator<any, any, any> {
  StateLoader.deleteAuth()
  yield history.replace(LOGIN_URL)
}

export default function * teamsSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_SESSIONS_CREATE, logIn),
    yield takeLatest(actions.API_USERS_CREATE, signUp),
    yield takeLatest([
      success(actions.API_SESSIONS_CREATE),
      success(actions.API_USERS_CREATE)
    ], onAuthed),
    yield takeLatest(actions.API_SESSIONS_UPDATE, updateSession),
    yield takeLatest([actions.LOG_OUT, failure(actions.API_SESSIONS_UPDATE)], logOut)
  ])
}
