import { decamelizeKeys } from 'humps'

import history from 'state/history'

import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import * as fplTeamListActions from 'state/fplTeamList/actions'

import {
  API_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAM_LISTS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

import { LIST_POSITION_1 } from 'test/fixtures'

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

vi.mock('state/fplTeamList/actions', async () => ({
  ...(await vi.importActual('state/fplTeamList/actions')),
  fetchListPositions: vi.fn(),
  setOutListPosition: vi.fn()
}))

afterEach(() => {
  vi.restoreAllMocks()
  vi.clearAllMocks()
})

const fplTeamListId = '1'
const inPlayerId = LIST_POSITION_1.player.id
const outPlayerId = '167'
const fplTeamId = '4'
const interTeamTradeGroupId = '2'
const interTeamTradeId = '13'

describe('Inter team trade groups actions', () => {
  describe('fetchInterTeamTradeGroups', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()

      actions.fetchInterTeamTradeGroups(fplTeamListId)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS, fplTeamListId })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups`,
        successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS),
        failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS)
      })
    })
  })

  describe('createInterTeamTradeGroup', () => {
    const getState = () => ({
      fplTeamList: {
        data: { id: fplTeamListId },
        outListPosition: { player: { id: outPlayerId } }
      },
      fplTeam: { data: { id: fplTeamId } }
    })

    it('dispatches the bare action and an apiRequest', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)

      await actions.createInterTeamTradeGroup(LIST_POSITION_1)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE, inListPosition: LIST_POSITION_1
      })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'POST',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups`,
        body: { inter_team_trade_group: decamelizeKeys({ inPlayerId, outPlayerId }) },
        successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE),
        failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE)
      })
    })

    it('clears the out list position and redirects on success', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.createInterTeamTradeGroup(LIST_POSITION_1)(dispatch, getState)

      expect(fplTeamListActions.setOutListPosition).toHaveBeenCalledWith(undefined)
      expect(historyReplaceSpy).toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${fplTeamId}/teamTrades`)
    })

    it('does not clear the out list position or redirect if the request fails', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.createInterTeamTradeGroup(LIST_POSITION_1)(dispatch, getState)

      expect(fplTeamListActions.setOutListPosition).not.toHaveBeenCalled()
      expect(historyReplaceSpy).not.toHaveBeenCalled()
    })
  })

  describe('submitInterTeamTradeGroup', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()
      const getState = () => ({ fplTeamList: { data: { id: fplTeamListId } } })

      actions.submitInterTeamTradeGroup(interTeamTradeGroupId)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT, interTeamTradeGroupId
      })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'POST',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups/${interTeamTradeGroupId}/submit`,
        successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT),
        failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT)
      })
    })
  })

  describe('addToInterTeamTradeGroup', () => {
    const getState = () => ({
      fplTeamList: {
        data: { id: fplTeamListId },
        outListPosition: { player: { id: outPlayerId } }
      },
      interTeamTradeGroup: { data: { id: interTeamTradeGroupId } },
      fplTeam: { data: { id: fplTeamId } }
    })

    it('dispatches the bare action and an apiRequest', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)

      await actions.addToInterTeamTradeGroup(LIST_POSITION_1)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE, inListPosition: LIST_POSITION_1
      })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'POST',
        url:
          `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups/${interTeamTradeGroupId}/add_trade`,
        body: { inter_team_trade_group: decamelizeKeys({ inPlayerId, outPlayerId }) },
        successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE),
        failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE)
      })
    })

    it('clears the out list position and redirects on success', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.addToInterTeamTradeGroup(LIST_POSITION_1)(dispatch, getState)

      expect(fplTeamListActions.setOutListPosition).toHaveBeenCalledWith(undefined)
      expect(historyReplaceSpy).toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${fplTeamId}/teamTrades`)
    })
  })

  describe('cancelInterTeamTradeGroup', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()
      const getState = () => ({ fplTeamList: { data: { id: fplTeamListId } } })

      actions.cancelInterTeamTradeGroup(interTeamTradeGroupId)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL, interTeamTradeGroupId
      })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'POST',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups/${interTeamTradeGroupId}/cancel`,
        successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL),
        failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL)
      })
    })
  })

  describe('approveInterTeamTradeGroup', () => {
    const getState = () => ({ fplTeamList: { data: { id: fplTeamListId } } })

    it('dispatches the bare action and an apiRequest', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)

      await actions.approveInterTeamTradeGroup(interTeamTradeGroupId)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE, interTeamTradeGroupId
      })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'POST',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups/${interTeamTradeGroupId}/approve`,
        successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE),
        failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE)
      })
    })

    it('refetches list positions and clears the out list position on success', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)

      await actions.approveInterTeamTradeGroup(interTeamTradeGroupId)(dispatch, getState)

      expect(fplTeamListActions.fetchListPositions).toHaveBeenCalledWith(fplTeamListId)
      expect(fplTeamListActions.setOutListPosition).toHaveBeenCalledWith(undefined)
    })

    it('does not refetch or clear the out list position if the request fails', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)

      await actions.approveInterTeamTradeGroup(interTeamTradeGroupId)(dispatch, getState)

      expect(fplTeamListActions.fetchListPositions).not.toHaveBeenCalled()
      expect(fplTeamListActions.setOutListPosition).not.toHaveBeenCalled()
    })
  })

  describe('declineInterTeamTradeGroup', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()
      const getState = () => ({ fplTeamList: { data: { id: fplTeamListId } } })

      actions.declineInterTeamTradeGroup(interTeamTradeGroupId)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE, interTeamTradeGroupId
      })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'POST',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups/${interTeamTradeGroupId}/decline`,
        successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE),
        failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE)
      })
    })
  })

  describe('removeTrade', () => {
    const getState = () => ({
      fplTeamList: { data: { id: fplTeamListId } },
      fplTeam: { data: { id: fplTeamId } }
    })

    it('dispatches the bare action and an apiRequest', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)

      await actions.removeTrade(interTeamTradeId)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE, interTeamTradeId })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'DELETE',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trades/${interTeamTradeId}`,
        successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE),
        failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE)
      })
    })

    it('clears the out list position and redirects on success', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.removeTrade(interTeamTradeId)(dispatch, getState)

      expect(fplTeamListActions.setOutListPosition).toHaveBeenCalledWith(undefined)
      expect(historyReplaceSpy).toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${fplTeamId}/teamTrades`)
    })
  })
})
