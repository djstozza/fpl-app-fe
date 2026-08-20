import qs from 'qs'

import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import { stringify } from 'utilities/helpers'
import history from 'state/history'
import { API_URL, PLAYERS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

afterEach(() => {
  vi.restoreAllMocks()
})

const playerId = '352'
const historySort = { kickoffTime: 'desc' }
const historyPastSort = { seasonName: 'asc' }
const sort = { history: historySort, historyPast: historyPastSort }

describe('Player actions', () => {
  describe('fetchPlayer', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()

      actions.fetchPlayer(playerId)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_PLAYERS_SHOW, playerId })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: false,
        method: 'GET',
        url: `${API_URL}${PLAYERS_URL}/${playerId}`,
        successAction: success(actions.API_PLAYERS_SHOW),
        failureAction: failure(actions.API_PLAYERS_SHOW)
      })
    })
  })

  describe('fetchPlayerHistory', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()

      actions.fetchPlayerHistory({ id: playerId, sort })(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_PLAYERS_HISTORY_INDEX, playerId, sort })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: false,
        method: 'GET',
        url: `${API_URL}${PLAYERS_URL}/${playerId}/history?${stringify({ sort: historySort })}`,
        successAction: success(actions.API_PLAYERS_HISTORY_INDEX),
        failureAction: failure(actions.API_PLAYERS_HISTORY_INDEX)
      })
    })
  })

  describe('fetchPlayerHistoryPast', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()

      actions.fetchPlayerHistoryPast({ id: playerId, sort })(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_PLAYERS_HISTORY_PAST_INDEX, playerId, sort })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: false,
        method: 'GET',
        url: `${API_URL}${PLAYERS_URL}/${playerId}/history_past?${stringify({ sort: historyPastSort })}`,
        successAction: success(actions.API_PLAYERS_HISTORY_PAST_INDEX),
        failureAction: failure(actions.API_PLAYERS_HISTORY_PAST_INDEX)
      })
    })
  })

  describe('updatePlayerHistorySort', () => {
    it('dispatches the bare action and pushes the new sort into the URL', () => {
      const dispatch = vi.fn()
      const getState = vi.fn().mockReturnValue({ player: { data: { id: playerId } } })
      const historyPushSpy = vi.spyOn(history, 'push')

      actions.updatePlayerHistorySort({ id: playerId, sort: historySort })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_PLAYER_HISTORY_SORT, sort: historySort })
      expect(historyPushSpy).toHaveBeenCalledWith(
        `${PLAYERS_URL}/${playerId}/history?${qs.stringify({ sort: { history: historySort } })}`
      )
    })
  })

  describe('updatePlayerHistoryPastSort', () => {
    it('dispatches the bare action and pushes the new sort into the URL', () => {
      const dispatch = vi.fn()
      const getState = vi.fn().mockReturnValue({ player: { data: { id: playerId } } })
      const historyPushSpy = vi.spyOn(history, 'push')

      actions.updatePlayerHistoryPastSort({ id: playerId, sort: historyPastSort })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_PLAYER_HISTORY_PAST_SORT, sort: historyPastSort })
      expect(historyPushSpy).toHaveBeenCalledWith(
        `${PLAYERS_URL}/${playerId}/historyPast?${qs.stringify({ sort: { historyPast: historyPastSort } })}`
      )
    })
  })
})
