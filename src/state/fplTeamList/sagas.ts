import { put, takeLatest, all } from 'redux-saga/effects'

import { stringify } from 'utilities/helpers'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'

import {
  API_URL,
  API_FPL_TEAM_LISTS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

export function * fetchFplTeamList (action) : Generator<any, any, any> {
  const { fplTeamListId } = action

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_FPL_TEAM_LISTS_SHOW),
    failureAction: failure(actions.API_FPL_TEAM_LISTS_SHOW)
  })
}

export function * fetchListPositions (action) : Generator<any, any, any> {
  const { fplTeamListId, interTeamTradeGroup: { trades = [] } = {} } = action
  const excludedPlayerIds = trades.map(({ outPlayer: { id } }) => id)

  const query = { filter: { excludedPlayerIds } }

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/list_positions?${stringify(query)}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX),
    failureAction: failure(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX)
  })
}

export function * processSubstitution (action) : Generator<any, any, any> {
  const { fplTeamListId, outListPositionId, inListPositionId } = action

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'PUT',
    url,
    body: {
      fpl_team_list: {
        out_list_position_id: outListPositionId,
        in_list_position_id: inListPositionId
      }
    },
    successAction: success(actions.API_FPL_TEAM_LISTS_UPDATE),
    failureAction: failure(actions.API_FPL_TEAM_LISTS_UPDATE)
  })
}

export default function * fplTeamListSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_FPL_TEAM_LISTS_SHOW, fetchFplTeamList),
    yield takeLatest(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX, fetchListPositions),
    yield takeLatest(actions.API_FPL_TEAM_LISTS_UPDATE, processSubstitution)
  ])
}
