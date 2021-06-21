import { put, takeLatest, all, select } from 'redux-saga/effects'
import { decamelizeKeys } from 'humps'
import { stringify } from 'utilities/helpers'
import qs from 'qs'

import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'

import {
  API_URL,
  LEAGUES_URL
} from 'utilities/constants'

function * fetchDraftPicks (action) : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.league)
  const { sort, filter } = action

  const url = `${API_URL}${LEAGUES_URL}/${id}/draft_picks?${stringify({ sort, filter })}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_LEAGUE_DRAFT_PICKS_INDEX),
    failureAction: failure(actions.API_LEAGUE_DRAFT_PICKS_INDEX)
  })
}

function * fetchDraftPickFacets (action) : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.league)

  const url = `${API_URL}${LEAGUES_URL}/${id}/draft_picks/facets`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX),
    failureAction: failure(actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX)
  })
}

function * updateFilter (action) : Generator<any, any, any> {
  const { filter } = action
  const { data: { id } } = yield select(state => state.league)
  const { sort } = yield select(state => state.draftPicks)

  const query = {
    filter,
    sort
  }

  yield history.push(`${LEAGUES_URL}/${id}/draft/draftPicks?${qs.stringify(query)}`)
}

function * updateSort (action) : Generator<any, any, any> {
  const { sort } = action
  const { data: { id } } = yield select(state => state.league)
  const { filter } = yield select(state => state.draftPicks)

  const query = { filter, sort }

  yield history.push(`${LEAGUES_URL}/${id}/draft/draftPicks?${qs.stringify(query)}`)
}

function * updateDraftPick (action) : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.league)
  const { filter, sort } = yield select(state => state.draftPicks)
  const { playerId, miniDraft, nextDraftPickId } = action

  const url = `${API_URL}${LEAGUES_URL}/${id}/draft_picks/${nextDraftPickId}?${stringify({ sort, filter })}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'PUT',
    url,
    body: { league: decamelizeKeys({ playerId, miniDraft }) },
    successAction: success(actions.API_LEAGUE_DRAFT_PICK_UPDATE),
    failureAction: failure(actions.API_LEAGUE_DRAFT_PICK_UPDATE)
  })
}

function * updateDraftPickSuccess (action) : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.league)

  yield history.replace(`${LEAGUES_URL}/${id}/draft`)
}

function * fetchDraftPicksStatus (action) : Generator<any, any, any> {
  const { leagueId } = action

  const url = `${API_URL}${LEAGUES_URL}/${leagueId}/draft_picks/status`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_LEAGUE_DRAFT_PICKS_STATUS_INDEX),
    failureAction: failure(actions.API_LEAGUE_DRAFT_PICKS_STATUS_INDEX)
  })
}

export default function * draftPicksSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_LEAGUE_DRAFT_PICKS_INDEX, fetchDraftPicks),
    yield takeLatest(actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX, fetchDraftPickFacets),
    yield takeLatest(actions.UPDATE_DRAFT_PICKS_FILTER, updateFilter),
    yield takeLatest(actions.UPDATE_DRAFT_PICKS_SORT, updateSort),
    yield takeLatest(actions.API_LEAGUE_DRAFT_PICK_UPDATE, updateDraftPick),
    yield takeLatest(success(actions.API_LEAGUE_DRAFT_PICK_UPDATE), updateDraftPickSuccess),
    yield takeLatest(actions.API_LEAGUE_DRAFT_PICKS_STATUS_INDEX, fetchDraftPicksStatus)
  ])
}
