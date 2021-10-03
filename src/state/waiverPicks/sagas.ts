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

export function * createWaiverPick (action) : Generator <any, any, any> {
  const { outListPosition: { id } } = yield select(state => state.fplTeamList)
  const { inPlayerId } = action

  const url = `${API_URL}${API_LIST_POSITIONS_PATH}/${id}/waiver_picks`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'POST',
    url,
    body: { waiver_pick: decamelizeKeys({ inPlayerId }) },
    successAction: success(actions.API_LIST_POSITION_WAIVER_PICKS_CREATE),
    failureAction: failure(actions.API_LIST_POSITION_WAIVER_PICKS_CREATE)
  })
}

export function * fetchWaiverPicks (action) : Generator <any, any, any> {
  const { fplTeamListId } = action

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/waiver_picks`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX),
    failureAction: failure(actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX)
  })
}

export function * createWaiverPickSuccess (action) : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.fplTeam)

  yield history.replace(`${FPL_TEAMS_URL}/${id}/waiverPicks`)
}

export function * changeWaiverPickOrder (action) : Generator <any, any, any> {
  const { fplTeamListId, waiverPickId, newPickNumber } = action

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/waiver_picks/${waiverPickId}/change_order`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'POST',
    url,
    body: { waiver_pick: decamelizeKeys({ newPickNumber }) },
    successAction: success(actions.API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER),
    failureAction: failure(actions.API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER)
  })
}

export default function * waiverPicksSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_LIST_POSITION_WAIVER_PICKS_CREATE, createWaiverPick),
    yield takeLatest(actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX, fetchWaiverPicks),
    yield takeLatest(success(actions.API_LIST_POSITION_WAIVER_PICKS_CREATE), createWaiverPickSuccess),
    yield takeLatest(actions.API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER, changeWaiverPickOrder)
  ])
}
