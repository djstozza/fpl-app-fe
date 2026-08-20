import { decamelizeKeys } from 'humps'

import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import { fetchListPositions } from 'state/fplTeamList/actions'
import history from 'state/history'
import {
  API_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAM_LISTS_PATH,
  API_LIST_POSITIONS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

vi.mock('state/fplTeamList/actions', async () => ({
  ...(await vi.importActual('state/fplTeamList/actions')),
  fetchListPositions: vi.fn()
}))

afterEach(() => {
  vi.restoreAllMocks()
  vi.clearAllMocks()
})

const listPositionId = '9'
const fplTeamListId = '5'
const fplTeamId = '4'
const inPlayerId = '132'

const getState = () => ({
  fplTeamList: { outListPosition: { id: listPositionId }, data: { id: fplTeamListId } },
  fplTeam: { data: { id: fplTeamId } }
})

describe('Trades actions', () => {
  describe('createTrade', () => {
    it('dispatches the bare action, an apiRequest, refetches list positions, and redirects on success', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.createTrade(inPlayerId)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LIST_POSITION_TRADES_CREATE, inPlayerId })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'POST',
        url: `${API_URL}${API_LIST_POSITIONS_PATH}/${listPositionId}/trades`,
        body: { trade: decamelizeKeys({ inPlayerId }) },
        successAction: success(actions.API_LIST_POSITION_TRADES_CREATE),
        failureAction: failure(actions.API_LIST_POSITION_TRADES_CREATE)
      })
      expect(fetchListPositions).toHaveBeenCalledWith(fplTeamListId)
      expect(historyReplaceSpy).toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${fplTeamId}/trades`)
    })

    it('does not refetch or redirect if the request fails', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.createTrade(inPlayerId)(dispatch, getState)

      expect(fetchListPositions).not.toHaveBeenCalled()
      expect(historyReplaceSpy).not.toHaveBeenCalled()
    })
  })

  describe('fetchTrades', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()

      actions.fetchTrades(fplTeamListId)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_FPL_TEAM_LIST_TRADES_INDEX, fplTeamListId })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/trades`,
        successAction: success(actions.API_FPL_TEAM_LIST_TRADES_INDEX),
        failureAction: failure(actions.API_FPL_TEAM_LIST_TRADES_INDEX)
      })
    })
  })
})
