import { put, takeLatest, all, select } from 'redux-saga/effects'
import { decamelizeKeys } from 'humps'
import { stringify } from 'utilities/helpers'
import qs from 'qs'

import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'
import { fetchPlayers } from 'state/players/actions'
import { setOutListPosition } from 'state/fplTeamList/actions'

import {
  API_URL,
  LEAGUES_URL,
  API_FPL_TEAM_LISTS_PATH
} from 'utilities/constants'

function * fetchMiniDraftPicks (action) : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.league)
  const { season } = yield select(state => state.miniDraftPicks)
  const { sort, filter } = action

  const query = { mini_draft_pick: { season }, sort, filter }

  const url = `${API_URL}${LEAGUES_URL}/${id}/mini_draft_picks?${stringify(query)}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX),
    failureAction: failure(actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX)
  })
}

function * fetchMiniDraftPickFacets (action) : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.league)
  const { season } = yield select(state => state.miniDraftPicks)

  const query = { mini_draft_pick: { season } }

  const url = `${API_URL}${LEAGUES_URL}/${id}/mini_draft_picks/facets?${stringify(query)}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX),
    failureAction: failure(actions.API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX)
  })
}

function * updateFilter (action) : Generator<any, any, any> {
  const { filter } = action
  const { data: { id } } = yield select(state => state.league)
  const { sort } = yield select(state => state.miniDraftPicks)

  const query = {
    filter,
    sort
  }

  yield history.push(`${LEAGUES_URL}/${id}/miniDraft/miniDraftPicks?${qs.stringify(query)}`)
}

function * updateSort (action) : Generator<any, any, any> {
  const { sort } = action
  const { data: { id } } = yield select(state => state.league)
  const { filter } = yield select(state => state.miniDraftPicks)

  const query = { filter, sort }

  yield history.push(`${LEAGUES_URL}/${id}/miniDraft/miniDraftPicks?${qs.stringify(query)}`)
}

function * fetchMiniDraftPicksStatus (action) : Generator<any, any, any> {
  const { leagueId } = action

  const url = `${API_URL}${LEAGUES_URL}/${leagueId}/mini_draft_picks/status`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX),
    failureAction: failure(actions.API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX)
  })
}

function * createMiniDraftPick (action) : Generator<any, any, any> {
  const { fplTeamListId } = yield select(state => state.miniDraftPicks)
  const { outListPosition: { id: listPositionId = '' } = {} } = yield select(state => state.fplTeamList)
  const { inPlayerId } = action

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/list_positions/${listPositionId}/mini_draft_picks`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'POST',
    url,
    body: { mini_draft_pick: decamelizeKeys({ inPlayerId }) },
    successAction: success(actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE),
    failureAction: failure(actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE)
  })
}

function * passMiniDraftPick () : Generator<any, any, any> {
  const { fplTeamListId } = yield select(state => state.miniDraftPicks)

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/mini_draft_picks`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'POST',
    url,
    body: { mini_draft_pick: decamelizeKeys({ passed: true }) },
    successAction: success(actions.API_LEAGUE_MINI_DRAFT_PICK_PASS),
    failureAction: failure(actions.API_LEAGUE_MINI_DRAFT_PICK_PASS)
  })
}

function * createMiniDraftPickSuccess (action) : Generator<any, any, any> {
  const { data: { id } } = yield select(state => state.league)

  yield all([
    fetchMiniDraftPicksStatus({ leagueId: id }),
    history.replace(`${LEAGUES_URL}/${id}/miniDraft`),
    put(setOutListPosition(undefined))
  ])
}

function * fetchTradeablePlayers (action) : Generator<any, any, any> {
  const { data: { id: leagueId } } = yield select(state => state.league)
  const { outListPosition: { position: { id: positionId = '' } = {} } = {} } = yield select(state => state.fplTeamList)
  const { sort, filter, page } = action


  yield put(fetchPlayers({ filter: { ...filter, leagueId, positionId }, sort, page }))
}

function * updateAvailablePlayersSort (action) : Generator<any, any, any> {
  const { data: { id: leagueId } } = yield select(state => state.league)
  const { filter, page } = yield select(state => state.players)
  const { outListPosition: { position: { id: positionId = '' } = {} } = {} } = yield select(state => state.fplTeamList)
  const { sort } = action

  const query = { filter: { ...filter, leagueId, positionId }, sort, page }

  yield history.replace(`${LEAGUES_URL}/${leagueId}/miniDraft/tradeableListPositions?${qs.stringify(query)}`)
}

function * updateAvailablePlayersFilter (action) : Generator<any, any, any> {
  const { data: { id: leagueId } } = yield select(state => state.league)
  const { sort, page } = yield select(state => state.players)
  const { outListPosition: { position: { id: positionId = '' } = {} } = {} } = yield select(state => state.fplTeamList)
  const { filter } = action

  const query = {
    filter: {
      ...filter,
      leagueId,
      positionId
    },
    sort,
    page: {
      ...page,
      offset: 0
    }
  }

  yield history.replace(`${LEAGUES_URL}/${leagueId}/miniDraft/tradeableListPositions?${qs.stringify(query)}`)
}

function * updateAvailablePlayersPage (action) : Generator<any, any, any> {
  const { data: { id: leagueId } } = yield select(state => state.league)
  const { filter, sort, page } = yield select(state => state.players)
  const { outListPosition: { position: { id: positionId = '' } = {} } = {} } = yield select(state => state.fplTeamList)
  const { offset } = action

  const query = {
    filter: {
      ...filter,
      leagueId,
      positionId
    },
    sort,
    page: {
      ...page,
      offset
    }
  }

  yield history.replace(`${LEAGUES_URL}/${leagueId}/miniDraft/tradeableListPositions?$${qs.stringify(query)}`)
}

export default function * miniDraftPicksSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX, fetchMiniDraftPicks),
    yield takeLatest(actions.API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX, fetchMiniDraftPickFacets),
    yield takeLatest(actions.UPDATE_MINI_DRAFT_PICKS_FILTER, updateFilter),
    yield takeLatest(actions.UPDATE_MINI_DRAFT_PICKS_SORT, updateSort),
    yield takeLatest(actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE, createMiniDraftPick),
    yield takeLatest(actions.API_LEAGUE_MINI_DRAFT_PICK_PASS, passMiniDraftPick),
    yield takeLatest(
      [
        success(actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE),
        success(actions.API_LEAGUE_MINI_DRAFT_PICK_PASS)
      ],
      createMiniDraftPickSuccess
    ),
    yield takeLatest(actions.API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX, fetchMiniDraftPicksStatus),
    yield takeLatest(actions.MINI_DRAFT_FETCH_TRADEABLE_PLAYERS, fetchTradeablePlayers),
    yield takeLatest(actions.MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_SORT, updateAvailablePlayersSort),
    yield takeLatest(actions.MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_FILTER, updateAvailablePlayersFilter),
    yield takeLatest(actions.MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_PAGE, updateAvailablePlayersPage)
  ])
}
