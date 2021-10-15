import { expectSaga } from 'redux-saga-test-plan'
import { decamelizeKeys } from 'humps'

import history from 'state/history'

import tradesSagas, * as sagas from './sagas'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import * as fplTeamListActions from 'state/fplTeamList/actions'

import {
  API_URL,
  API_FPL_TEAM_LISTS_PATH,
  API_LIST_POSITIONS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

import {
  FPL_TEAM_1,
  FPL_TEAM_LIST_1,
  LIST_POSITION_1
} from 'test/fixtures'
const { id: fplTeamListId } = LIST_POSITION_1
const inPlayerId = '342'

describe('Trades sagas', () => {
  test('fetchTrades', () => {
    expectSaga(tradesSagas, actions.fetchTrades(fplTeamListId))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/trades`,
        successAction: success(actions.API_FPL_TEAM_LIST_TRADES_INDEX),
        failureAction: failure(actions.API_FPL_TEAM_LIST_TRADES_INDEX)
      })
      .dispatch({ type: actions.API_TEAMS_INDEX })
      .run()

    expectSaga(sagas.fetchTrades, actions.fetchTrades(fplTeamListId))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/trades`,
        successAction: success(actions.API_FPL_TEAM_LIST_TRADES_INDEX),
        failureAction: failure(actions.API_FPL_TEAM_LIST_TRADES_INDEX)
      })
      .dispatch({ type: actions.API_TEAMS_INDEX })
      .run()
  })

  test('createTrade', () => {
    expectSaga(tradesSagas, actions.createTrade(inPlayerId))
      .withState({
        fplTeamList: { outListPosition: LIST_POSITION_1 }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'POST',
        url: `${API_URL}${API_LIST_POSITIONS_PATH}/${fplTeamListId}/trades`,
        body: { trade: decamelizeKeys({ inPlayerId }) },
        successAction: success(actions.API_LIST_POSITION_TRADES_CREATE),
        failureAction: failure(actions.API_LIST_POSITION_TRADES_CREATE)
      })
      .dispatch({ type: actions.API_LIST_POSITION_TRADES_CREATE })
      .run()
  })

  test('creatTradeSuccess', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.creatTradeSuccess)
      .withState({
        fplTeam: { data: FPL_TEAM_1 },
        fplTeamList: { data: FPL_TEAM_LIST_1 }
      })
      .put({ type: fplTeamListActions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX, fplTeamListId, interTeamTradeGroup: undefined })
      .dispatch({ type: success(actions.API_LIST_POSITION_TRADES_CREATE) })
      .run()

      expect(historyReplaceSpy).toHaveBeenCalled()
  })
})
