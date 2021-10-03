import { put, takeLatest, all } from 'redux-saga/effects'

import * as actions from './actions'
import * as requestActions from 'state/request/actions'

import {
  API_URL,
  API_FPL_TEAM_LISTS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

export function * fetchInterTeamTradeGroup (action) : Generator <any, any, any> {
  const { fplTeamListId, interTeamTradeGroupId } = action
  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups/${interTeamTradeGroupId}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP),
    failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP)
  })
}

export default function * interTeamTradeGroupSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP, fetchInterTeamTradeGroup)
  ])
}
