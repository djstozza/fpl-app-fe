import { put, takeLatest, all } from 'redux-saga/effects'

import { stringify } from 'utilities/helpers'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'

import {
  API_URL,
  API_FPL_TEAM_LISTS_PATH,
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

export function * fetchFplTeamLists (action) : Generator<any, any, any> {
  const { fplTeamId } = action
  const query = { fplTeamList: { fplTeamId } }

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}?${stringify(query)}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_FPL_TEAM_LISTS_INDEX),
    failureAction: failure(actions.API_FPL_TEAM_LISTS_INDEX)
  })
}

export default function * fplTeamListsSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_FPL_TEAM_LISTS_INDEX, fetchFplTeamLists)
  ])
}
