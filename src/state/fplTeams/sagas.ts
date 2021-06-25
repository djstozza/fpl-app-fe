import { put, takeLatest, all } from 'redux-saga/effects'
import qs from 'qs'

import history from 'state/history'

import * as actions from './actions'
import * as requestActions from 'state/request/actions'

import {
  API_URL,
  PROFILE_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAMS_PATH,
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

function * fetchFplTeams (action): Generator<any, any, any> {
  const url = `${API_URL}${API_FPL_TEAMS_PATH}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_FPL_TEAMS_INDEX),
    failureAction: failure(actions.API_FPL_TEAMS_INDEX)
  })
}

function * updateSort (action) : Generator<any, any, any> {
  const { sort } = action

  yield history.push(`${PROFILE_URL}${FPL_TEAMS_URL}?${qs.stringify({ sort })}`)
}

export default function * fplTeamsSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_FPL_TEAMS_INDEX, fetchFplTeams),
    yield takeLatest(actions.UPDATE_FPL_TEAMS_SORT, updateSort)
  ])
}
