import { expectSaga } from 'redux-saga-test-plan'

import { stringify } from 'utilities/helpers'
import fplTeamListSagas, * as sagas from './sagas'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'

import {
  API_URL,
  API_FPL_TEAM_LISTS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

import { INTER_TEAM_TRADE_GROUP_1, PLAYER_BASES } from 'test/fixtures'

const fplTeamListId = '3'
const excludedPlayerIds = [PLAYER_BASES[0].id, PLAYER_BASES[1].id].join(',')
const outListPositionId = '10'
const inListPositionId = '1'

describe('Fpl team list sagas', () => {
  test('fetchFplTeamList', () => {
    expectSaga(fplTeamListSagas)
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}`,
        successAction: success(actions.API_FPL_TEAM_LISTS_SHOW),
        failureAction: failure(actions.API_FPL_TEAM_LISTS_SHOW)
      })
      .dispatch({ type: actions.API_FPL_TEAM_LISTS_SHOW })
      .run()
  })

  test('fetchListPositions', () => {
    let query = { filter: { excludedPlayerIds: '' } }

    expectSaga(sagas.fetchListPositions, actions.fetchListPositions(fplTeamListId))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/list_positions?${stringify(query)}`,
        successAction: success(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX),
        failureAction: failure(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX)
      })
      .dispatch({ type: actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX })
      .run()

    query = { filter: { excludedPlayerIds } }

    expectSaga(sagas.fetchListPositions, actions.fetchListPositions(fplTeamListId, INTER_TEAM_TRADE_GROUP_1))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/list_positions?${stringify(query)}`,
        successAction: success(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX),
        failureAction: failure(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX)
      })
      .dispatch({ type: actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX })
      .run()
  })

  test('processSubstitution', () => {
    expectSaga(sagas.processSubstitution, actions.processSubstitution(fplTeamListId, outListPositionId, inListPositionId))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'PUT',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}`,
        body: {
          fpl_team_list: {
            out_list_position_id: outListPositionId,
            in_list_position_id: inListPositionId
          }
        },
        successAction: success(actions.API_FPL_TEAM_LISTS_UPDATE),
        failureAction: failure(actions.API_FPL_TEAM_LISTS_UPDATE)
      })
      .dispatch({ type: actions.API_FPL_TEAM_LISTS_UPDATE })
      .run()
  })
})
