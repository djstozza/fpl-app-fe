import { put, takeLatest, all, select } from 'redux-saga/effects'
import { decamelizeKeys } from 'humps'
import { stringify } from 'utilities/helpers'
import qs from 'qs'

import history from 'state/history'

import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import { fetchPlayers } from 'state/players/actions'

import {
  API_URL,
  LEAGUES_URL
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

export function * fetchLeague (action): Generator<any, any, any> {
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

export function * updateLeagueSuccess () : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.league)
  yield history.replace(`${LEAGUES_URL}/${id}`)
}

export function * updateLeague (action): Generator<any, any, any> {
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

export function * fetchLeagueFplTeams (action) : Generator<any, any, any> {
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

export function * updateFplTeamsSort (action) : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.league)
  const { sort } = action

  yield history.push(`${LEAGUES_URL}/${id}/fplTeams?${qs.stringify({ sort })}`)
}

export function * generateDraftPicks (action) : Generator<any, any, any> {
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

export function * generateDraftPicksSuccess () : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.league)
  const sort = { draft_pick_number: 'asc' }

  yield all([
    history.replace(`${LEAGUES_URL}/${id}/fplTeams?${stringify({ sort })}`),
    fetchLeague({ leagueId: id })
  ])
}

export function * createDraft (action) : Generator<any, any, any> {
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

export function * fetchAvailablePlayers (action) : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.league)
  const { sort, filter, page } = action

  yield put(fetchPlayers({ filter: { ...filter, leagueId: id }, sort, page }))
}

export function * updateAvailablePlayersSort (action) : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.league)
  const { filter, page } = yield select(state => state.players)
  const { sort } = action

  const query = { filter, sort, page }

  yield history.push(`${LEAGUES_URL}/${id}/draft/availablePlayers?${qs.stringify(query)}`)
}

export function * updateAvailablePlayersFilter (action) : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.league)
  const { sort, page } = yield select(state => state.players)
  const { filter } = action

  const query = {
    filter,
    sort,
    page: {
      ...page,
      offset: 0
    }
  }

  yield history.push(`${LEAGUES_URL}/${id}/draft/availablePlayers?${qs.stringify(query)}`)
}

export function * updateAvailablePlayersPage (action) : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.league)
  const { filter, sort, page } = yield select(state => state.players)
  const { offset } = action


  const query = {
    filter,
    sort,
    page: {
      ...page,
      offset
    }
  }

  yield history.push(`${LEAGUES_URL}/${id}/draft/availablePlayers?${qs.stringify(query)}`)
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
    yield takeLatest(actions.API_LEAGUE_CREATE_DRAFT, createDraft),
    yield takeLatest(actions.FETCH_AVAILABLE_PLAYERS, fetchAvailablePlayers),
    yield takeLatest(actions.UPDATE_AVAILABLE_PLAYERS_SORT, updateAvailablePlayersSort),
    yield takeLatest(actions.UPDATE_AVAILABLE_PLAYERS_FILTER, updateAvailablePlayersFilter),
    yield takeLatest(actions.UPDATE_AVAILABLE_PLAYERS_PAGE, updateAvailablePlayersPage)
  ])
}
