import { put, takeLatest, all } from 'redux-saga/effects'
import { decamelizeKeys } from 'humps'
import qs from 'qs'

import history from 'state/history'

import * as actions from './actions'
import * as requestActions from 'state/request/actions'

import {
  API_URL,
  PROFILE_URL,
  LEAGUES_URL
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

function * fetchLeagues (action): Generator<any, any, any> {
  const url = `${API_URL}${LEAGUES_URL}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_LEAGUES_INDEX),
    failureAction: failure(actions.API_LEAGUES_INDEX)
  })
}

function * createLeagueSuccess (action) : Generator<any, any, any> {
  yield history.replace(`${PROFILE_URL}${LEAGUES_URL}`)
}

function * createLeague (action): Generator<any, any, any> {
  const { league } = action
  const url = `${API_URL}${LEAGUES_URL}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'POST',
    url,
    body: { league: decamelizeKeys(league) },
    successAction: success(actions.API_LEAGUES_CREATE),
    failureAction: failure(actions.API_LEAGUES_CREATE)
  })
}

function * updateSort (action) : Generator<any, any, any> {
  const { sort } = action

  yield history.push(`${PROFILE_URL}${LEAGUES_URL}?${qs.stringify({ sort })}`)
}

export default function * leaguesSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_LEAGUES_INDEX, fetchLeagues),
    yield takeLatest(actions.API_LEAGUES_CREATE, createLeague),
    yield takeLatest(success(actions.API_LEAGUES_CREATE), createLeagueSuccess),
    yield takeLatest([actions.UPDATE_LEAGUES_SORT], updateSort)
  ])
}
