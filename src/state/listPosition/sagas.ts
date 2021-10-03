import { put, takeLatest, all, select } from 'redux-saga/effects'
import qs from 'qs'
import { stringify } from 'utilities/helpers'

import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'
import { fetchPlayers } from 'state/players/actions'

import {
  API_URL,
  FPL_TEAMS_URL,
  API_LIST_POSITIONS_PATH,
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

export function * fetchValidSubstitutions (action) : Generator<any, any, any> {
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

export function * fetchTradeablePlayers (action) : Generator<any, any, any> {
  const { data: { league: { id: leagueId } } } = yield select(state => state.fplTeam)
  const { outListPosition: { position: { id: positionId } } } = yield select(state => state.fplTeamList)
  const { sort, filter, page } = action

  yield put(fetchPlayers({ filter: { ...filter, leagueId, positionId }, sort, page }))
}

export function * updateAvailablePlayersSort (action) : Generator<any, any, any> {
  const { data: { id, league: { id: leagueId } } } = yield select(state => state.fplTeam)
  const { filter, page } = yield select(state => state.players)
  const { outListPosition: { position: { id: positionId } } } = yield select(state => state.fplTeamList)
  const { sort } = action

  const query = { filter: { ...filter, leagueId, positionId }, sort, page }

  yield history.replace(`${FPL_TEAMS_URL}/${id}/waiverPicks/new?${qs.stringify(query)}`)
}

export function * updateAvailablePlayersFilter (action) : Generator<any, any, any> {
  const { data: { id, league: { id: leagueId } } } = yield select(state => state.fplTeam)
  const { sort, page } = yield select(state => state.players)
  const { outListPosition: { position: { id: positionId } } } = yield select(state => state.fplTeamList)
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

  yield history.replace(`${FPL_TEAMS_URL}/${id}/waiverPicks/new?${qs.stringify(query)}`)
}

export function * updateAvailablePlayersPage (action) : Generator<any, any, any> {
  const { data: { id, league: { id: leagueId } } } = yield select(state => state.fplTeam)
  const { filter, sort, page } = yield select(state => state.players)
  const { outListPosition: { position: { id: positionId } } } = yield select(state => state.fplTeamList)
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

  yield history.replace(`${FPL_TEAMS_URL}/${id}/waiverPicks/new?${qs.stringify(query)}`)
}

export function * fetchTradeableListPositions (action) : Generator<any, any, any> {
  const { outListPosition: { id } } = yield select(state => state.fplTeamList)
  const { sort, filter } = action

  const url = `${API_URL}${API_LIST_POSITIONS_PATH}/${id}/tradeable_list_positions?${stringify({ sort, filter })}`
  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS),
    failureAction: failure(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS)
  })
}

export function * fetchTradeableListPositionFacets (action) : Generator<any, any, any> {
  const { outListPosition: { id } } = yield select(state => state.fplTeamList)

  const url = `${API_URL}${API_LIST_POSITIONS_PATH}/${id}/tradeable_list_position_facets`
  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS),
    failureAction: failure(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS)
  })
}

export function * updateTradeableListPositionsFilter (action) : Generator<any, any, any> {
  const { data: { id, league: { id: leagueId } } } = yield select(state => state.fplTeam)
  const { sort } = yield select(state => state.listPosition)
  const { outListPosition: { position: { id: positionId } } } = yield select(state => state.fplTeamList)
  const { filter } = action

  const query = { filter: { ...filter, leagueId, positionId }, sort }

  yield history.replace(`${FPL_TEAMS_URL}/${id}/teamTrades/new?${qs.stringify(query)}`)
}

export function * updateTradeableListPositionsSort (action) : Generator<any, any, any> {
  const { data: { id, league: { id: leagueId } } } = yield select(state => state.fplTeam)
  const { filter } = yield select(state => state.listPosition)
  const { outListPosition: { position: { id: positionId } } } = yield select(state => state.fplTeamList)
  const { sort } = action

  const query = { filter: { ...filter, leagueId, positionId }, sort }

  yield history.replace(`${FPL_TEAMS_URL}/${id}/teamTrades/new?${qs.stringify(query)}`)
}

export default function * listPositionSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_LIST_POSITION_SHOW, fetchValidSubstitutions),
    yield takeLatest(actions.FETCH_TRADEABLE_PLAYERS, fetchTradeablePlayers),
    yield takeLatest(actions.UPDATE_TRADEABLE_PLAYERS_SORT, updateAvailablePlayersSort),
    yield takeLatest(actions.UPDATE_TRADEABLE_PLAYERS_FILTER, updateAvailablePlayersFilter),
    yield takeLatest(actions.UPDATE_TRADEABLE_PLAYERS_PAGE, updateAvailablePlayersPage),
    yield takeLatest(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS, fetchTradeableListPositions),
    yield takeLatest(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS, fetchTradeableListPositionFacets),
    yield takeLatest(actions.UPDATE_TRADEABLE_LIST_POSITIONS_SORT, updateTradeableListPositionsSort),
    yield takeLatest(actions.UPDATE_TRADEABLE_LIST_POSITIONS_FILTER, updateTradeableListPositionsFilter)
  ])
}
