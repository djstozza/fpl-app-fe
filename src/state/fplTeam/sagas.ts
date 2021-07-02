import { put, takeLatest, select, all } from 'redux-saga/effects'
import { decamelizeKeys } from 'humps'

import history from 'state/history'

import * as actions from './actions'
import * as requestActions from 'state/request/actions'

import {
  API_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAMS_PATH,
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

function * fetchFplTeam (action): Generator<any, any, any> {
  const { fplTeamId } = action
  const url = `${API_URL}${API_FPL_TEAMS_PATH}/${fplTeamId}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_FPL_TEAMS_SHOW),
    failureAction: failure(actions.API_FPL_TEAMS_SHOW)
  })
}

function * updateFplTeam (action): Generator<any, any, any> {
  const { fplTeam } = action

  const { data: { id } } = yield select(state => state.fplTeam)
  const url = `${API_URL}${API_FPL_TEAMS_PATH}/${id}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'PUT',
    url,
    body: { fpl_team: decamelizeKeys(fplTeam) },
    successAction: success(actions.API_FPL_TEAMS_UPDATE),
    failureAction: failure(actions.API_FPL_TEAMS_UPDATE)
  })
}

function * updateFplTeamSuccess (action) : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.fplTeam)

  yield history.replace(`${FPL_TEAMS_URL}/${id}`)
}

export default function * fplTeamSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_FPL_TEAMS_SHOW, fetchFplTeam),
    yield takeLatest(actions.API_FPL_TEAMS_UPDATE, updateFplTeam),
    yield takeLatest(success(actions.API_FPL_TEAMS_UPDATE), updateFplTeamSuccess)
  ])
}
