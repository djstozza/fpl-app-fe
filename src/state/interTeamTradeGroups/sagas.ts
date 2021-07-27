import { put, takeLatest, all, select } from 'redux-saga/effects'
import { decamelizeKeys } from 'humps'

import history from 'state/history'

import * as actions from './actions'
import * as requestActions from 'state/request/actions'

import {
  API_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAM_LISTS_PATH,
  API_LIST_POSITIONS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

function * createInterTeamTradeGroup (action) : Generator <any, any, any> {
  const {
    data: { id },
    outListPosition: { player: { id: outPlayerId = '' } = {} } = {}
  } = yield select(state => state.fplTeamList)

  const { inListPosition: { player: { id: inPlayerId }, fplTeamListId: inFplTeamListId } } = action

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${id}/inter_team_trade_groups`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'POST',
    url,
    body: { inter_team_trade_group: decamelizeKeys({ inFplTeamListId, inPlayerId, outPlayerId }) },
    successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE),
    failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE)
  })
}

export default function * waiverPicksSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE, createInterTeamTradeGroup)
  ])
}
