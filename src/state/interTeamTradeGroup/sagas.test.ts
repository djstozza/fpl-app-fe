import { expectSaga } from 'redux-saga-test-plan'

import interTeamTradeGroupSagas from './sagas'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'

import {
  API_URL,
  API_FPL_TEAM_LISTS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

const fplTeamListId = '3'
const interTeamTradeGroupId = '7'

describe('Inter team trade group sagas', () => {
  test('fetchInterTeamTradeGroup', () => {
    expectSaga(interTeamTradeGroupSagas, actions.fetchInterTeamTradeGroup(fplTeamListId, interTeamTradeGroupId))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups/${interTeamTradeGroupId}`,
        successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP),
        failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP)
      })
      .dispatch({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP })
      .run()
  })
})
