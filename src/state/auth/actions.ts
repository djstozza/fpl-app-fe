import { decamelizeKeys } from 'humps'

import { apiRequest } from 'state/request/actions'
import history from 'state/history'
import StateLoader from 'utilities/stateLoader'

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

export const INITIALIZE_AUTH = 'INITIALIZE_AUTH'
export const API_SESSIONS_CREATE = 'API_SESSIONS_CREATE'
export const API_SESSIONS_UPDATE = 'API_SESSIONS_UPDATE'
export const API_USERS_CREATE = 'API_USERS_CREATE'
export const API_USERS_UPDATE = 'API_USERS_UPDATE'
export const API_PASSWORDS_UPDATE = 'API_PASSWORDS_UPDATE'
export const LOG_OUT = 'LOG_OUT'

type LogInProps = {
  user: { email: string, password: string }
}

type SignUpProps = {
  user: { email: string, username: string, password: string }
}

type ChangePasswordProps = {
  user: { password: string, newPassword: string }
}

type UpdateUserProps = {
  user: { email: string, username: string }
}

export const initializeAuth = () => ({ type: INITIALIZE_AUTH })

export const logIn = ({ user }: LogInProps) => async (dispatch) => {
  dispatch({ type: API_SESSIONS_CREATE, user })

  const url = `${API_URL}${API_SESSIONS_PATH}`

  const ok = await dispatch(apiRequest({
    needsAuth: false,
    method: 'POST',
    body: { user: decamelizeKeys(user) },
    url,
    successAction: success(API_SESSIONS_CREATE),
    failureAction: failure(API_SESSIONS_CREATE)
  }))

  if (ok) history.replace(PROFILE_URL)
}

export const signUp = ({ user }: SignUpProps) => async (dispatch) => {
  dispatch({ type: API_USERS_CREATE, user })

  const url = `${API_URL}${API_REGISTRATIONS_PATH}`

  const ok = await dispatch(apiRequest({
    needsAuth: false,
    method: 'POST',
    body: { user: decamelizeKeys(user) },
    url,
    successAction: success(API_USERS_CREATE),
    failureAction: failure(API_USERS_CREATE)
  }))

  if (ok) history.replace(PROFILE_URL)
}

const clearAuth = () => {
  StateLoader.deleteAuth()
  history.replace(LOGIN_URL)
}

export const updateSession = () => async (dispatch) => {
  dispatch({ type: API_SESSIONS_UPDATE })

  const url = `${API_URL}${API_SESSIONS_PATH}`

  const ok = await dispatch(apiRequest({
    needsAuth: true,
    method: 'PUT',
    url,
    body: {},
    successAction: success(API_SESSIONS_UPDATE),
    failureAction: failure(API_SESSIONS_UPDATE)
  }))

  if (!ok) clearAuth()
}

export const logOut = () => (dispatch) => {
  dispatch({ type: LOG_OUT })
  clearAuth()
}

export const updateUser = ({ user }: UpdateUserProps) => async (dispatch) => {
  dispatch({ type: API_USERS_UPDATE, user })

  const url = `${API_URL}${API_USERS_PATH}`

  const ok = await dispatch(apiRequest({
    needsAuth: true,
    method: 'PUT',
    body: { user: decamelizeKeys(user) },
    url,
    successAction: success(API_USERS_UPDATE),
    failureAction: failure(API_USERS_UPDATE)
  }))

  if (ok) history.replace(PROFILE_URL)
}

export const changePassword = ({ user }: ChangePasswordProps) => async (dispatch) => {
  dispatch({ type: API_PASSWORDS_UPDATE, user })

  const url = `${API_URL}${API_PASSWORDS_PATH}`

  const ok = await dispatch(apiRequest({
    needsAuth: true,
    method: 'PUT',
    body: { user: decamelizeKeys(user) },
    url,
    successAction: success(API_PASSWORDS_UPDATE),
    failureAction: failure(API_PASSWORDS_UPDATE)
  }))

  if (ok) history.replace(PROFILE_URL)
}
