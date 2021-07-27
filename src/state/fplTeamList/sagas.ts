import { put, takeLatest, all, select } from 'redux-saga/effects'

import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'

import {
  API_URL,
  API_FPL_TEAM_LISTS_PATH,
  FPL_TEAMS_URL
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

function * fetchFplTeamList (action) : Generator<any, any, any> {
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

function * fetchListPositions (action) : Generator<any, any, any> {
  const { fplTeamListId } = action

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/list_positions`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX),
    failureAction: failure(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX)
  })
}

function * processSubstitution (action) : Generator<any, any, any> {
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
