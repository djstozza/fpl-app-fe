import { put, takeLatest, all } from 'redux-saga/effects'

import { API_URL, ROUNDS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'

export function * fetchRound (action) : Generator<any, any, any> {
  const { roundId } = action
  const url = `${API_URL}${ROUNDS_URL}/${roundId}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_ROUNDS_SHOW),
    failureAction: failure(actions.API_ROUNDS_SHOW)
  })
}

export default function * roundSagas () : Generator<any, any, any> {
  yield all([
    takeLatest(actions.API_ROUNDS_SHOW, fetchRound)
  ])
}
