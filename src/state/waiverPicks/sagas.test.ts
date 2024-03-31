import { expectSaga } from 'redux-saga-test-plan'
import { decamelizeKeys } from 'humps'

import history from 'state/history'

import waiverPicksSagas, * as sagas from './sagas'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'

import {
  API_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAM_LISTS_PATH,
  API_LIST_POSITIONS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

import { FPL_TEAM_1, LIST_POSITION_1 } from 'test/fixtures'
const { id } = FPL_TEAM_1
const { id: outListPositionId } = LIST_POSITION_1
const fplTeamListId = '4'
const inPlayerId = '241'
const waiverPickId = '13'
const newPickNumber = '4'

describe('Waiver picks sagas', () => {
  test('fetchWaiverPicks', () => {
    expectSaga(waiverPicksSagas)
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/waiver_picks`,
        successAction: success(actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX),
        failureAction: failure(actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX)
      })
      .dispatch({ type: actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX })
      .run()
  })

  test('createWaiverPick', () => {
    expectSaga(sagas.createWaiverPick, actions.createWaiverPick(inPlayerId))
      .withState({
        fplTeamList: { outListPosition: LIST_POSITION_1 }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'POST',
        url: `${API_URL}${API_LIST_POSITIONS_PATH}/${outListPositionId}/waiver_picks`,
        body: { waiver_pick: decamelizeKeys({ inPlayerId }) },
        successAction: success(actions.API_LIST_POSITION_WAIVER_PICKS_CREATE),
        failureAction: failure(actions.API_LIST_POSITION_WAIVER_PICKS_CREATE)
      })
      .dispatch({ type: actions.API_LIST_POSITION_WAIVER_PICKS_CREATE })
      .run()
  })

  test('createWaiverPickSuccess', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.createWaiverPickSuccess)
      .withState({
        fplTeam: { data: FPL_TEAM_1 }
      })
      .dispatch({ type: success(actions.API_LIST_POSITION_WAIVER_PICKS_CREATE) })
      .run()

    expect(historyReplaceSpy).toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${id}/waiverPicks`)
  })

  test('changeWaiverPickOrder', () => {
    expectSaga(sagas.changeWaiverPickOrder, actions.changeWaiverPickOrder(fplTeamListId, waiverPickId, newPickNumber))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'POST',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/waiver_picks/${waiverPickId}/change_order`,
        body: { waiver_pick: decamelizeKeys({ newPickNumber }) },
        successAction: success(actions.API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER),
        failureAction: failure(actions.API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER)
      })
      .dispatch({ type: actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX })
      .run()
  })
})
