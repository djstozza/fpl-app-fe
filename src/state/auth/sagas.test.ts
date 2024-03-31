import { expectSaga } from 'redux-saga-test-plan'
import { decamelizeKeys } from 'humps'

import authSagas, * as sagas from './sagas'
import * as actions from './actions'
import { requestActions } from 'state/request'
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
import history from 'state/history'
import { authKey } from 'utilities/stateLoader'

describe('Auth sagas', () => {
  test('logIn', () => {
    const user = { email: 'user@example.com', password: 'password' }

    expectSaga(authSagas)
      .put({
        type: requestActions.UNAUTHED_REQUEST,
        method: 'POST',
        url: `${API_URL}${API_SESSIONS_PATH}`,
        body: { user: decamelizeKeys(user) },
        successAction: success(actions.API_SESSIONS_CREATE),
        failureAction: failure(actions.API_SESSIONS_CREATE)
      })
      .dispatch({ type: actions.API_SESSIONS_CREATE, user })
      .run()
  })

  test('signUp', () => {
    const user = { email: 'user@example.com', username: 'User 1', password: 'password' }

    expectSaga(sagas.signUp, actions.signUp({ user }))
      .put({
        type: requestActions.UNAUTHED_REQUEST,
        method: 'POST',
        url: `${API_URL}${API_REGISTRATIONS_PATH}`,
        body: { user: decamelizeKeys(user) },
        successAction: success(actions.API_USERS_CREATE),
        failureAction: failure(actions.API_USERS_CREATE)
      })
      .dispatch({ type: actions.API_USERS_CREATE, user })
      .run()
  })

  test(`onAuthed - ${success(actions.API_SESSIONS_CREATE)}`, () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.onAuthed)
      .dispatch({ type: success(actions.API_SESSIONS_CREATE) })
      .run()
    expect(historyReplaceSpy).toHaveBeenCalledWith(PROFILE_URL)
  })

  test(`onAuthed - ${success(actions.API_USERS_CREATE)}`, () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.onAuthed)
      .dispatch({ type: success(actions.API_USERS_CREATE) })
      .run()
    expect(historyReplaceSpy).toHaveBeenCalledWith(PROFILE_URL)
  })

  test('updateSession', () => {
    expectSaga(sagas.updateSession)
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'PUT',
        url: `${API_URL}${API_SESSIONS_PATH}`,
        body: {},
        successAction: success(actions.API_SESSIONS_UPDATE),
        failureAction: failure(actions.API_SESSIONS_UPDATE)
      })
      .dispatch({ type: actions.API_SESSIONS_UPDATE })
      .run()
  })

  test(`logOut - ${actions.LOG_OUT}`, () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')
    jest.spyOn(window.localStorage.__proto__, 'removeItem')

    expectSaga(sagas.logOut)
      .dispatch({ type: actions.LOG_OUT })
      .run()
    expect(historyReplaceSpy).toHaveBeenCalledWith(LOGIN_URL)
    expect(localStorage.removeItem).toHaveBeenCalledWith(authKey)
  })

  test(`logOut - ${failure(actions.API_SESSIONS_UPDATE)}`, () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')
    jest.spyOn(window.localStorage.__proto__, 'removeItem')

    expectSaga(sagas.logOut)
      .dispatch({ type: failure(actions.API_SESSIONS_UPDATE) })
      .run()
    expect(historyReplaceSpy).toHaveBeenCalledWith(LOGIN_URL)
    expect(localStorage.removeItem).toHaveBeenCalledWith(authKey)
  })

  test('updateUser', () => {
    const user = { email: 'user@example.com', username: 'User 1' }

    expectSaga(sagas.updateUser, actions.updateUser({ user }))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'PUT',
        body: { user: decamelizeKeys(user) },
        url: `${API_URL}${API_USERS_PATH}`,
        successAction: success(actions.API_USERS_UPDATE),
        failureAction: failure(actions.API_USERS_UPDATE)
      })
      .dispatch({ type: actions.API_USERS_UPDATE, user })
      .run()
  })

  test(`updateUserSuccess - ${success(actions.API_USERS_UPDATE)}`, () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.updateUserSuccess)
      .dispatch({ type: success(actions.API_USERS_UPDATE) })
      .run()
    expect(historyReplaceSpy).toHaveBeenCalledWith(PROFILE_URL)
  })

  test(`updateUserSuccess - ${success(actions.API_PASSWORDS_UPDATE)}`, () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.updateUserSuccess)
      .dispatch({ type: success(actions.API_PASSWORDS_UPDATE) })
      .run()
    expect(historyReplaceSpy).toHaveBeenCalledWith(PROFILE_URL)
  })

  test('changePassword', () => {
    const user = { password: 'password', newPassword: 'newPassword' }

    expectSaga(sagas.changePassword, actions.changePassword({ user }))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'PUT',
        body: { user: decamelizeKeys(user) },
        url: `${API_URL}${API_PASSWORDS_PATH}`,
        successAction: success(actions.API_PASSWORDS_UPDATE),
        failureAction: failure(actions.API_PASSWORDS_UPDATE)
      })
      .dispatch({ type: actions.API_PASSWORDS_UPDATE, user })
      .run()
  })
})
