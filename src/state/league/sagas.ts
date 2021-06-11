import { put, takeLatest, all, select } from 'redux-saga/effects'
import { decamelizeKeys } from 'humps'
import { stringify } from 'utilities/helpers'
import qs from 'qs'

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

function * fetchLeagueFplTeams (action) : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.league)
  const { sort } = action
  const url = `${API_URL}${LEAGUES_URL}/${id}/fpl_teams?${stringify({ sort })}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_LEAGUE_FPL_TEAMS_INDEX),
    failureAction: failure(actions.API_LEAGUE_FPL_TEAMS_INDEX)
  })
}

function * updateFplTeamsSort (action) : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.league)
  const { sort } = action

  yield history.push(`${LEAGUES_URL}/${id}/fplTeams?${qs.stringify({ sort })}`)
}

function * generateDraftPicks (action) : Generator<any, any, any> {
  const { leagueId } = action
  const url = `${API_URL}${LEAGUES_URL}/${leagueId}/generate_draft_picks`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'POST',
    url,
    successAction: success(actions.API_LEAGUE_GENERATE_DRAFT_PICKS),
    failureAction: failure(actions.API_LEAGUE_GENERATE_DRAFT_PICKS)
  })
}

function * generateDraftPicksSuccess (action) : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.league)
  const sort = { draft_pick_number: 'asc' }
  yield history.replace(`${LEAGUES_URL}/${id}/fplTeams?${stringify({ sort })}`)
}

function * createDraft (action) : Generator<any, any, any> {
  const { leagueId } = action
  const url = `${API_URL}${LEAGUES_URL}/${leagueId}/create_draft`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'POST',
    url,
    successAction: success(actions.API_LEAGUE_CREATE_DRAFT),
    failureAction: failure(actions.API_LEAGUE_CREATE_DRAFT)
  })
}

export default function * leagueSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_LEAGUES_SHOW, fetchLeague),
    yield takeLatest(actions.API_LEAGUES_UPDATE, updateLeague),
    yield takeLatest(actions.API_LEAGUE_FPL_TEAMS_INDEX, fetchLeagueFplTeams),
    yield takeLatest(success(actions.API_LEAGUES_UPDATE), updateLeagueSuccess),
    yield takeLatest(actions.UPDATE_LEAGUE_FPL_TEAMS_SORT, updateFplTeamsSort),
    yield takeLatest(actions.API_LEAGUE_GENERATE_DRAFT_PICKS, generateDraftPicks),
    yield takeLatest(success(actions.API_LEAGUE_GENERATE_DRAFT_PICKS), generateDraftPicksSuccess),
    yield takeLatest(actions.API_LEAGUE_CREATE_DRAFT, createDraft)
  ])
}
