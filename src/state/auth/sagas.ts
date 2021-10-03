import { put, takeLatest, takeEvery, all } from 'redux-saga/effects'
import { decamelizeKeys } from 'humps'

import {
  API_URL,
  API_SESSIONS_PATH,
  API_REGISTRATIONS_PATH,
  PROFILE_URL,
  LOGIN_URL,
  API_USERS_PATH,
  API_PASSWORDS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'
import StateLoader from 'utilities/stateLoader'

export function * logIn (action) : Generator<any, any, any> {
  const { user } = action
  const url = `${API_URL}${API_SESSIONS_PATH}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'POST',
    body: { user: decamelizeKeys(user) },
    url,
    successAction: success(actions.API_SESSIONS_CREATE),
    failureAction: failure(actions.API_SESSIONS_CREATE)
  })
}

export function * signUp (action) : Generator<any, any, any> {
  const { user } = action

  const url = `${API_URL}${API_REGISTRATIONS_PATH}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'POST',
    body: { user: decamelizeKeys(user) },
    url,
    successAction: success(actions.API_USERS_CREATE),
    failureAction: failure(actions.API_USERS_CREATE)
  })
}

export function * onAuthed (action) : Generator<any, any, any> {
  yield history.replace(PROFILE_URL)
}

export function * updateSession (action): Generator<any, any, any> {
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

export function * logOut (action): Generator<any, any, any> {
  StateLoader.deleteAuth()
  yield history.replace(LOGIN_URL)
}

export function * updateUser (action) : Generator<any, any, any> {
  const { user } = action

  const url = `${API_URL}${API_USERS_PATH}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'PUT',
    body: { user: decamelizeKeys(user) },
    url,
    successAction: success(actions.API_USERS_UPDATE),
    failureAction: failure(actions.API_USERS_UPDATE)
  })
}

export function * updateUserSuccess (action) : Generator<any, any, any> {
  yield history.replace(PROFILE_URL)
}

export function * changePassword (action) : Generator<any, any, any> {
  const { user } = action

  const url = `${API_URL}${API_PASSWORDS_PATH}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'PUT',
    body: { user: decamelizeKeys(user) },
    url,
    successAction: success(actions.API_PASSWORDS_UPDATE),
    failureAction: failure(actions.API_PASSWORDS_UPDATE)
  })
}

export default function * authSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_SESSIONS_CREATE, logIn),
    yield takeLatest(actions.API_USERS_CREATE, signUp),
    yield takeLatest([
      success(actions.API_SESSIONS_CREATE),
      success(actions.API_USERS_CREATE)
    ], onAuthed),
    yield takeLatest(actions.API_SESSIONS_UPDATE, updateSession),
    yield takeEvery([actions.LOG_OUT, failure(actions.API_SESSIONS_UPDATE)], logOut),
    yield takeLatest(actions.API_USERS_UPDATE, updateUser),
    yield takeLatest(actions.API_PASSWORDS_UPDATE, changePassword),
    yield takeLatest([
      success(actions.API_USERS_UPDATE),
      success(actions.API_PASSWORDS_UPDATE)
    ], updateUserSuccess)
  ])
}
