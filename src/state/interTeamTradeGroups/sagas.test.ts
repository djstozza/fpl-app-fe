import { expectSaga } from 'redux-saga-test-plan'
import { decamelizeKeys } from 'humps'

import history from 'state/history'

import interTeamTradeGroupsSagas, * as sagas from './sagas'
import * as actions from './actions'
import * as fplTeamListActions from 'state/fplTeamList/actions'
import * as requestActions from 'state/request/actions'

import {
  API_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAM_LISTS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

const fplTeamListId = '1'
const inFplTeamListId = '5'
const inPlayerId = '354'
const outPlayerId = '167'
const fplTeamId = '4'
const interTeamTradeGroupId = '2'
const interTeamTradeId = '13'

describe('Inter team trade groups sagas', () => {
  test('fetchInterTeamTradeGroup', () => {
    expectSaga(interTeamTradeGroupsSagas, actions.fetchInterTeamTradeGroups(fplTeamListId))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups`,
        successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS),
        failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS)
      })
      .dispatch({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS })
      .run()
  })

  test('createInterTeamTradeGroup', () => {
    expectSaga(
      sagas.createInterTeamTradeGroup,
      actions.createInterTeamTradeGroup({ player: { id: inPlayerId }, fplTeamListId: inFplTeamListId })
    )
      .withState({
        fplTeamList: {
          data: { id: fplTeamListId },
          outListPosition: { player: { id: outPlayerId } }
        }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'POST',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups`,
        body: { inter_team_trade_group: decamelizeKeys({ inFplTeamListId, inPlayerId, outPlayerId }) },
        successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE),
        failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE)
      })
      .dispatch({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS })
      .run()
  })

  test(`interTeamTradeGroupSuccess - ${success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE)}`, () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.interTeamTradeGroupSuccess)
      .withState({
        fplTeam: {
          data: { id: fplTeamId }
        }
      })
      .put({ type: fplTeamListActions.SET_OUT_LIST_POSITION, outListPosition: undefined })
      .dispatch({ type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE) })
      .run()

    expect(historyReplaceSpy).toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${fplTeamId}/teamTrades`)
  })

  test(`interTeamTradeGroupSuccess - ${success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE)}`, () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.interTeamTradeGroupSuccess)
      .withState({
        fplTeam: {
          data: { id: fplTeamId }
        }
      })
      .put({ type: fplTeamListActions.SET_OUT_LIST_POSITION, outListPosition: undefined })
      .dispatch({ type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE) })
      .run()

    expect(historyReplaceSpy).toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${fplTeamId}/teamTrades`)
  })

  test(`interTeamTradeGroupSuccess - ${success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE)}`, () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.interTeamTradeGroupSuccess)
      .withState({
        fplTeam: {
          data: { id: fplTeamId }
        }
      })
      .put({ type: fplTeamListActions.SET_OUT_LIST_POSITION, outListPosition: undefined })
      .dispatch({ type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE) })
      .run()

    expect(historyReplaceSpy).toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${fplTeamId}/teamTrades`)
  })

  test('submitInterTeamTradeGroup', () => {
    expectSaga(
      sagas.submitInterTeamTradeGroup,
      actions.submitInterTeamTradeGroup(interTeamTradeGroupId)
    )
      .withState({
        fplTeamList: {
          data: { id: fplTeamListId },
        }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'POST',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups/${interTeamTradeGroupId}/submit`,
        successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT),
        failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT)
      })
      .dispatch({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT })
      .run()
  })

  test('addToInterTeamTradeGroup', () => {
    expectSaga(
      sagas.addToInterTeamTradeGroup,
      actions.addToInterTeamTradeGroup({ player: { id: inPlayerId }, fplTeamListId: inFplTeamListId })
    )
      .withState({
        fplTeamList: {
          data: { id: fplTeamListId },
          outListPosition: { player: { id: outPlayerId } }
        },
        interTeamTradeGroup: { data: { id: interTeamTradeGroupId } }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'POST',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups/${interTeamTradeGroupId}/add_trade`,
        body: { inter_team_trade_group: decamelizeKeys({ inPlayerId, outPlayerId }) },
        successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE),
        failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE)
      })
      .dispatch({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE })
      .run()
  })

  test('cancelInterTeamTradeGroup', () => {
    expectSaga(
      sagas.cancelInterTeamTradeGroup,
      actions.cancelInterTeamTradeGroup(interTeamTradeGroupId)
    )
      .withState({
        fplTeamList: {
          data: { id: fplTeamListId },
        }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'POST',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups/${interTeamTradeGroupId}/cancel`,
        successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL),
        failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL)
      })
      .dispatch({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL })
      .run()
  })

  test('approveInterTeamTradeGroup', () => {
    expectSaga(
      sagas.approveInterTeamTradeGroup,
      actions.approveInterTeamTradeGroup(interTeamTradeGroupId)
    )
      .withState({
        fplTeamList: {
          data: { id: fplTeamListId },
        }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'POST',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups/${interTeamTradeGroupId}/approve`,
        successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE),
        failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE)
      })
      .dispatch({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE })
      .run()
  })

  test('declineInterTeamTradeGroup', () => {
    expectSaga(
      sagas.declineInterTeamTradeGroup,
      actions.declineInterTeamTradeGroup(interTeamTradeGroupId)
    )
      .withState({
        fplTeamList: {
          data: { id: fplTeamListId },
        }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'POST',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups/${interTeamTradeGroupId}/decline`,
        successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE),
        failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE)
      })
      .dispatch({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE })
      .run()
  })

  test('removeTrade', () => {
    expectSaga(sagas.removeTrade, actions.removeTrade(interTeamTradeId))
      .withState({
        fplTeamList: {
          data: { id: fplTeamListId }
        }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'DELETE',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trades/${interTeamTradeId}`,
        successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE),
        failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE)
      })
      .dispatch({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE })
      .run()
  })

  test('approveInterTeamTradeGroupSuccess', () => {
    expectSaga(sagas.approveInterTeamTradeGroupSuccess)
      .withState({
        fplTeamList: {
          data: { id: fplTeamListId }
        }
      })
      .put({ type: fplTeamListActions.SET_OUT_LIST_POSITION, outListPosition: undefined })
      .put({
        type: fplTeamListActions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX,
        fplTeamListId,
        interTeamTradeGroup: undefined
      })
      .dispatch({ type: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE) })
      .run()
  })
})
