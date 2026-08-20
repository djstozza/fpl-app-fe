import { decamelizeKeys } from 'humps'
import qs from 'qs'

import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import history from 'state/history'
import {
  API_URL,
  PROFILE_URL,
  LEAGUES_URL,
  JOIN_LEAGUE_URL
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

afterEach(() => {
  vi.restoreAllMocks()
})

const league = { name: 'League 1', code: '1234', fplTeamName: 'Fpl team 1' }
const sort = { name: 'asc' }

describe('Leagues actions', () => {
  describe('fetchLeagues', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()
      const getState = vi.fn()

      actions.fetchLeagues()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LEAGUES_INDEX })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}`,
        successAction: success(actions.API_LEAGUES_INDEX),
        failureAction: failure(actions.API_LEAGUES_INDEX)
      })
    })
  })

  describe('createLeague', () => {
    it('dispatches the bare action, an apiRequest, and redirects on success', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)
      const getState = vi.fn()
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.createLeague({ league })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LEAGUES_CREATE, league })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'POST',
        url: `${API_URL}${LEAGUES_URL}`,
        body: { league: decamelizeKeys(league) },
        successAction: success(actions.API_LEAGUES_CREATE),
        failureAction: failure(actions.API_LEAGUES_CREATE)
      })
      expect(historyReplaceSpy).toHaveBeenCalledWith(`${PROFILE_URL}${LEAGUES_URL}`)
    })

    it('does not redirect if the request fails', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)
      const getState = vi.fn()
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.createLeague({ league })(dispatch, getState)

      expect(historyReplaceSpy).not.toHaveBeenCalled()
    })
  })

  describe('joinLeague', () => {
    it('dispatches the bare action, an apiRequest, and redirects on success', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)
      const getState = vi.fn()
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.joinLeague({ league })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LEAGUES_JOIN, league })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'POST',
        url: `${API_URL}${JOIN_LEAGUE_URL}`,
        body: { league: decamelizeKeys(league) },
        successAction: success(actions.API_LEAGUES_JOIN),
        failureAction: failure(actions.API_LEAGUES_JOIN)
      })
      expect(historyReplaceSpy).toHaveBeenCalledWith(`${PROFILE_URL}${LEAGUES_URL}`)
    })

    it('does not redirect if the request fails', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)
      const getState = vi.fn()
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.joinLeague({ league })(dispatch, getState)

      expect(historyReplaceSpy).not.toHaveBeenCalled()
    })
  })

  describe('updateSort', () => {
    it('dispatches the bare action and pushes the new sort into the URL', () => {
      const dispatch = vi.fn()
      const getState = vi.fn()
      const historyPushSpy = vi.spyOn(history, 'push')

      actions.updateSort(sort)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_LEAGUES_SORT, sort })
      expect(historyPushSpy).toHaveBeenCalledWith(`${PROFILE_URL}${LEAGUES_URL}?${qs.stringify({ sort })}`)
    })
  })

  describe('initializeForm', () => {
    it('returns the bare action', () => {
      expect(actions.initializeForm()).toEqual({ type: actions.INITIALIZE_FORM })
    })
  })
})
