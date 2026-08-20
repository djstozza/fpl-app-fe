import { decamelizeKeys } from 'humps'

import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import history from 'state/history'
import StateLoader, { authKey } from 'utilities/stateLoader'

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

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

afterEach(() => {
  vi.restoreAllMocks()
  vi.clearAllMocks()
})

const email = 'user@example.com'
const password = 'password'
const username = 'user 1'

describe('Auth actions', () => {
  describe('initializeAuth', () => {
    it('returns the bare action', () => {
      expect(actions.initializeAuth()).toEqual({ type: actions.INITIALIZE_AUTH })
    })
  })

  describe('logIn', () => {
    const user = { email, password }

    it('dispatches the bare action, an apiRequest, and redirects on success', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.logIn({ user })(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_SESSIONS_CREATE, user })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: false,
        method: 'POST',
        body: { user: decamelizeKeys(user) },
        url: `${API_URL}${API_SESSIONS_PATH}`,
        successAction: success(actions.API_SESSIONS_CREATE),
        failureAction: failure(actions.API_SESSIONS_CREATE)
      })
      expect(historyReplaceSpy).toHaveBeenCalledWith(PROFILE_URL)
    })

    it('does not redirect if the request fails', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.logIn({ user })(dispatch)

      expect(historyReplaceSpy).not.toHaveBeenCalled()
    })
  })

  describe('signUp', () => {
    const user = { email, password, username }

    it('dispatches the bare action, an apiRequest, and redirects on success', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.signUp({ user })(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_USERS_CREATE, user })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: false,
        method: 'POST',
        body: { user: decamelizeKeys(user) },
        url: `${API_URL}${API_REGISTRATIONS_PATH}`,
        successAction: success(actions.API_USERS_CREATE),
        failureAction: failure(actions.API_USERS_CREATE)
      })
      expect(historyReplaceSpy).toHaveBeenCalledWith(PROFILE_URL)
    })

    it('does not redirect if the request fails', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.signUp({ user })(dispatch)

      expect(historyReplaceSpy).not.toHaveBeenCalled()
    })
  })

  describe('updateSession', () => {
    it('dispatches the bare action and an apiRequest', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)

      await actions.updateSession()(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_SESSIONS_UPDATE })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'PUT',
        url: `${API_URL}${API_SESSIONS_PATH}`,
        body: {},
        successAction: success(actions.API_SESSIONS_UPDATE),
        failureAction: failure(actions.API_SESSIONS_UPDATE)
      })
    })

    it('clears auth and redirects to login if the request fails', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)
      const historyReplaceSpy = vi.spyOn(history, 'replace')
      const deleteAuthSpy = vi.spyOn(StateLoader, 'deleteAuth')

      await actions.updateSession()(dispatch)

      expect(deleteAuthSpy).toHaveBeenCalled()
      expect(historyReplaceSpy).toHaveBeenCalledWith(LOGIN_URL)
    })

    it('does not clear auth or redirect if the request succeeds', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)
      const historyReplaceSpy = vi.spyOn(history, 'replace')
      const deleteAuthSpy = vi.spyOn(StateLoader, 'deleteAuth')

      await actions.updateSession()(dispatch)

      expect(deleteAuthSpy).not.toHaveBeenCalled()
      expect(historyReplaceSpy).not.toHaveBeenCalled()
    })
  })

  describe('logOut', () => {
    it('dispatches the bare action, clears auth, and redirects to login', () => {
      const dispatch = vi.fn()
      const historyReplaceSpy = vi.spyOn(history, 'replace')
      const deleteAuthSpy = vi.spyOn(StateLoader, 'deleteAuth')
      vi.spyOn(window.localStorage.__proto__, 'removeItem')

      actions.logOut()(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.LOG_OUT })
      expect(deleteAuthSpy).toHaveBeenCalled()
      expect(localStorage.removeItem).toHaveBeenCalledWith(authKey)
      expect(historyReplaceSpy).toHaveBeenCalledWith(LOGIN_URL)
    })
  })

  describe('updateUser', () => {
    const user = { email, username }

    it('dispatches the bare action, an apiRequest, and redirects on success', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.updateUser({ user })(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_USERS_UPDATE, user })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'PUT',
        body: { user: decamelizeKeys(user) },
        url: `${API_URL}${API_USERS_PATH}`,
        successAction: success(actions.API_USERS_UPDATE),
        failureAction: failure(actions.API_USERS_UPDATE)
      })
      expect(historyReplaceSpy).toHaveBeenCalledWith(PROFILE_URL)
    })

    it('does not redirect if the request fails', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.updateUser({ user })(dispatch)

      expect(historyReplaceSpy).not.toHaveBeenCalled()
    })
  })

  describe('changePassword', () => {
    const user = { password, newPassword: 'newPassword' }

    it('dispatches the bare action, an apiRequest, and redirects on success', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.changePassword({ user })(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_PASSWORDS_UPDATE, user })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'PUT',
        body: { user: decamelizeKeys(user) },
        url: `${API_URL}${API_PASSWORDS_PATH}`,
        successAction: success(actions.API_PASSWORDS_UPDATE),
        failureAction: failure(actions.API_PASSWORDS_UPDATE)
      })
      expect(historyReplaceSpy).toHaveBeenCalledWith(PROFILE_URL)
    })

    it('does not redirect if the request fails', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.changePassword({ user })(dispatch)

      expect(historyReplaceSpy).not.toHaveBeenCalled()
    })
  })
})
