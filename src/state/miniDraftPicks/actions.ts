import { decamelizeKeys } from 'humps'
import qs from 'qs'

import { apiRequest } from 'state/request/actions'
import history from 'state/history'
import { fetchPlayers } from 'state/players/actions'
import { setOutListPosition } from 'state/fplTeamList/actions'
import { stringify } from 'utilities/helpers'

import { API_URL, LEAGUES_URL, API_FPL_TEAM_LISTS_PATH } from 'utilities/constants'
import { success, failure } from 'utilities/actions'

import type { Filter, Sort } from 'types'

export const API_LEAGUE_MINI_DRAFT_PICKS_INDEX = 'API_LEAGUE_MINI_DRAFT_PICKS_INDEX'
export const API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX = 'API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX'
export const API_LEAGUE_MINI_DRAFT_PICK_CREATE = 'API_LEAGUE_MINI_DRAFT_PICK_CREATE'
export const API_LEAGUE_MINI_DRAFT_PICK_PASS = 'API_LEAGUE_MINI_DRAFT_PICK_PASS'
export const API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX = 'API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX'
export const UPDATE_MINI_DRAFT_PICKS_FILTER = 'UPDATE_MINI_DRAFT_PICKS_FILTER'
export const UPDATE_MINI_DRAFT_PICKS_SORT = 'UPDATE_MINI_DRAFT_PICKS_SORT'
export const MINI_DRAFT_FETCH_TRADEABLE_PLAYERS = 'MINI_DRAFT_FETCH_TRADEABLE_PLAYERS'
export const MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_FILTER = 'MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_FILTER'
export const MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_SORT = 'MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_SORT'
export const MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_PAGE = 'MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_PAG'

type Page = { offset?: string | number, limit?: string | number }

type Props = {
  filter?: Filter,
  sort?: Sort,
  page?: Page
}

export const fetchMiniDraftPicks = ({ sort, filter }: Props) => (dispatch, getState) => {
  dispatch({ type: API_LEAGUE_MINI_DRAFT_PICKS_INDEX, sort, filter })

  const { data: { id } } = getState().league
  const { season } = getState().miniDraftPicks

  const query = { mini_draft_pick: { season }, sort: sort || {}, filter: filter || {} }
  const url = `${API_URL}${LEAGUES_URL}/${id}/mini_draft_picks?${stringify(query)}`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url,
    successAction: success(API_LEAGUE_MINI_DRAFT_PICKS_INDEX),
    failureAction: failure(API_LEAGUE_MINI_DRAFT_PICKS_INDEX)
  }))
}

export const fetchMiniDraftPicksStatus = (leagueId: string) => (dispatch) => {
  dispatch({ type: API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX, leagueId })

  const url = `${API_URL}${LEAGUES_URL}/${leagueId}/mini_draft_picks/status`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url,
    successAction: success(API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX),
    failureAction: failure(API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX)
  }))
}

export const fetchMiniDraftPickFacets = () => (dispatch, getState) => {
  dispatch({ type: API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX })

  const { data: { id } } = getState().league
  const { season } = getState().miniDraftPicks

  const query = { mini_draft_pick: { season } }
  const url = `${API_URL}${LEAGUES_URL}/${id}/mini_draft_picks/facets?${stringify(query)}`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url,
    successAction: success(API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX),
    failureAction: failure(API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX)
  }))
}

export const updateFilter = (filter: Filter) => (dispatch, getState) => {
  dispatch({ type: UPDATE_MINI_DRAFT_PICKS_FILTER, filter })

  const { data: { id } } = getState().league
  const { sort } = getState().miniDraftPicks

  const query = { filter, sort }

  history.push(`${LEAGUES_URL}/${id}/miniDraft/miniDraftPicks?${qs.stringify(query)}`)
}

export const updateSort = (sort: Sort) => (dispatch, getState) => {
  dispatch({ type: UPDATE_MINI_DRAFT_PICKS_SORT, sort })

  const { data: { id } } = getState().league
  const { filter } = getState().miniDraftPicks

  const query = { filter, sort }

  history.push(`${LEAGUES_URL}/${id}/miniDraft/miniDraftPicks?${qs.stringify(query)}`)
}

const miniDraftPickSuccess = () => (dispatch, getState) => {
  const { data: { id } } = getState().league

  dispatch(fetchMiniDraftPicksStatus(id))
  history.replace(`${LEAGUES_URL}/${id}/miniDraft`)
  dispatch(setOutListPosition(undefined))
}

export const createMiniDraftPick = (inPlayerId: string) => async (dispatch, getState) => {
  dispatch({ type: API_LEAGUE_MINI_DRAFT_PICK_CREATE, inPlayerId })

  const { fplTeamListId } = getState().miniDraftPicks
  const { outListPosition: { id: listPositionId } } = getState().fplTeamList
  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/list_positions/${listPositionId}/mini_draft_picks`

  const ok = await dispatch(apiRequest({
    needsAuth: true,
    method: 'POST',
    url,
    body: { mini_draft_pick: decamelizeKeys({ inPlayerId }) },
    successAction: success(API_LEAGUE_MINI_DRAFT_PICK_CREATE),
    failureAction: failure(API_LEAGUE_MINI_DRAFT_PICK_CREATE)
  }))

  if (ok) miniDraftPickSuccess()(dispatch, getState)
}

export const passMiniDraftPick = () => async (dispatch, getState) => {
  dispatch({ type: API_LEAGUE_MINI_DRAFT_PICK_PASS })

  const { fplTeamListId } = getState().miniDraftPicks
  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/mini_draft_picks`

  const ok = await dispatch(apiRequest({
    needsAuth: true,
    method: 'POST',
    url,
    body: { mini_draft_pick: decamelizeKeys({ passed: true }) },
    successAction: success(API_LEAGUE_MINI_DRAFT_PICK_PASS),
    failureAction: failure(API_LEAGUE_MINI_DRAFT_PICK_PASS)
  }))

  if (ok) miniDraftPickSuccess()(dispatch, getState)
}

export const fetchTradeablePlayers = ({ sort, filter, page }: Props) => (dispatch, getState) => {
  dispatch({ type: MINI_DRAFT_FETCH_TRADEABLE_PLAYERS, sort, filter, page })

  const { data: { id: leagueId } } = getState().league
  const { outListPosition: { position: { id: positionId } } } = getState().fplTeamList

  dispatch(fetchPlayers({ filter: { ...filter, leagueId, positionId }, sort, page }))
}

export const updateTradeablePlayersSort = (sort: Sort) => (dispatch, getState) => {
  dispatch({ type: MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_SORT, sort })

  const { data: { id: leagueId } } = getState().league
  const { filter, page } = getState().players
  const { outListPosition: { position: { id: positionId } } } = getState().fplTeamList

  const query = { filter: { ...filter, leagueId, positionId }, sort, page }

  history.replace(`${LEAGUES_URL}/${leagueId}/miniDraft/tradeableListPositions?${qs.stringify(query)}`)
}

export const updateTradeablePlayersFilter = (filter: Filter) => (dispatch, getState) => {
  dispatch({ type: MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_FILTER, filter })

  const { data: { id: leagueId } } = getState().league
  const { sort, page } = getState().players
  const { outListPosition: { position: { id: positionId } } } = getState().fplTeamList

  const query = {
    filter: { ...filter, leagueId, positionId },
    sort,
    page: { ...page, offset: 0 }
  }

  history.replace(`${LEAGUES_URL}/${leagueId}/miniDraft/tradeableListPositions?${qs.stringify(query)}`)
}

export const updateTradeablePlayersPage = (offset: string) => (dispatch, getState) => {
  dispatch({ type: MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_PAGE, offset })

  const { data: { id: leagueId } } = getState().league
  const { filter, sort, page } = getState().players
  const { outListPosition: { position: { id: positionId } } } = getState().fplTeamList

  const query = {
    filter: { ...filter, leagueId, positionId },
    sort,
    page: { ...page, offset }
  }

  history.replace(`${LEAGUES_URL}/${leagueId}/miniDraft/tradeableListPositions?$${qs.stringify(query)}`)
}
