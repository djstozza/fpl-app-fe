import { put, takeLatest, all, select } from 'redux-saga/effects'
import { decamelizeKeys } from 'humps'

import history from 'state/history'

import * as actions from './actions'
import * as requestActions from 'state/request/actions'

import {
  API_URL,
  LEAGUES_URL
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

function * fetchLeague (action): Generator<any, any, any> {
  const { leagueId } = action
  const url = `${API_URL}${LEAGUES_URL}/${leagueId}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_LEAGUES_SHOW),
    failureAction: failure(actions.API_LEAGUES_SHOW)
  })
}

function * updateLeagueSuccess (action) : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.league)
  yield history.replace(`${LEAGUES_URL}/${id}`)
}

function * updateLeague (action): Generator<any, any, any> {
  const { league } = action
  const { data: { id } } = yield select(state => state.league)
  const url = `${API_URL}${LEAGUES_URL}/${id}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'PUT',
    url,
    body: { league: decamelizeKeys(league) },
    successAction: success(actions.API_LEAGUES_UPDATE),
    failureAction: failure(actions.API_LEAGUES_UPDATE)
  })
}

export default function * leagueSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_LEAGUES_SHOW, fetchLeague),
    yield takeLatest(actions.API_LEAGUES_UPDATE, updateLeague),
    yield takeLatest(success(actions.API_LEAGUES_UPDATE), updateLeagueSuccess)
  ])
}
