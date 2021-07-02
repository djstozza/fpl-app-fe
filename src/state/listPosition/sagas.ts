import { put, takeLatest, all } from 'redux-saga/effects'

import * as actions from './actions'
import * as requestActions from 'state/request/actions'

import {
  API_URL,
  API_LIST_POSITIONS_PATH,
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

function * fetchValidSubstitutions (action) : Generator<any, any, any> {
  const { listPositionId } = action

  const url = `${API_URL}${API_LIST_POSITIONS_PATH}/${listPositionId}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_LIST_POSITION_SHOW),
    failureAction: failure(actions.API_LIST_POSITION_SHOW)
  })
}

export default function * listPositionSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_LIST_POSITION_SHOW, fetchValidSubstitutions)
  ])
}
