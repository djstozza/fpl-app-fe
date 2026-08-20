import qs from 'qs'

import { apiRequest } from 'state/request/actions'
import history from 'state/history'
import { fetchPlayers } from 'state/players/actions'
import { stringify } from 'utilities/helpers'

import {
  API_URL,
  FPL_TEAMS_URL,
  API_LIST_POSITIONS_PATH,
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

import type { Filter, Sort } from 'types'

type Page = { offset?: string | number, limit?: string | number }

type Props = {
  filter?: Filter,
  sort?: Sort,
  page?: Page
}

export const API_LIST_POSITION_SHOW = 'API_LIST_POSITION_SHOW'
export const CLEAR_VALID_SUBSTITUTIONS = 'CLEAR_VALID_SUBSTITUTIONS'

export const FETCH_TRADEABLE_PLAYERS = 'FETCH_TRADEABLE_PLAYERS'
export const UPDATE_TRADEABLE_PLAYERS_SORT = 'UPDATE_TRADEABLE_PLAYERS_SORT'
export const UPDATE_TRADEABLE_PLAYERS_FILTER = 'UPDATE_TRADEABLE_PLAYERS_FILTER'
export const UPDATE_TRADEABLE_PLAYERS_PAGE = 'UPDATE_TRADEABLE_PLAYERS_PAGE'

export const API_LIST_POSITION_TRADEABLE_LIST_POSITIONS = 'API_LIST_POSITION_TRADEABLE_LIST_POSITIONS'
export const API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS = 'API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS'
export const UPDATE_TRADEABLE_LIST_POSITIONS_SORT = 'UPDATE_TRADEABLE_LIST_POSITIONS_SORT'
export const UPDATE_TRADEABLE_LIST_POSITIONS_FILTER = 'UPDATE_TRADEABLE_LIST_POSITIONS_FILTER'

export const fetchValidSubstitutions = (listPositionId: string) => (dispatch) => {
  dispatch({ type: API_LIST_POSITION_SHOW, listPositionId })

  const url = `${API_URL}${API_LIST_POSITIONS_PATH}/${listPositionId}`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url,
    successAction: success(API_LIST_POSITION_SHOW),
    failureAction: failure(API_LIST_POSITION_SHOW)
  }))
}

export const clearValidSubstitutions = () => ({ type: CLEAR_VALID_SUBSTITUTIONS })

export const fetchTradeablePlayers = ({ sort, filter, page }: Props) => (dispatch, getState) => {
  dispatch({ type: FETCH_TRADEABLE_PLAYERS, sort, filter, page })

  const { data: { league: { id: leagueId } } } = getState().fplTeam
  const { outListPosition: { position: { id: positionId } } } = getState().fplTeamList

  dispatch(fetchPlayers({ filter: { ...filter, leagueId, positionId }, sort, page }))
}

export const updateTradeablePlayersFilter = (filter: Filter) => (dispatch, getState) => {
  dispatch({ type: UPDATE_TRADEABLE_PLAYERS_FILTER, filter })

  const { data: { id, league: { id: leagueId } } } = getState().fplTeam
  const { sort, page } = getState().players
  const { outListPosition: { position: { id: positionId } } } = getState().fplTeamList

  const query = {
    filter: { ...filter, leagueId, positionId },
    sort,
    page: { ...page, offset: 0 }
  }

  history.replace(`${FPL_TEAMS_URL}/${id}/waiverPicks/new?${qs.stringify(query)}`)
}

export const updateTradeablePlayersSort = (sort: Sort) => (dispatch, getState) => {
  dispatch({ type: UPDATE_TRADEABLE_PLAYERS_SORT, sort })

  const { data: { id, league: { id: leagueId } } } = getState().fplTeam
  const { filter, page } = getState().players
  const { outListPosition: { position: { id: positionId } } } = getState().fplTeamList

  const query = { filter: { ...filter, leagueId, positionId }, sort, page }

  history.replace(`${FPL_TEAMS_URL}/${id}/waiverPicks/new?${qs.stringify(query)}`)
}

export const updateTradeablePlayersPage = (offset: string) => (dispatch, getState) => {
  dispatch({ type: UPDATE_TRADEABLE_PLAYERS_PAGE, offset })

  const { data: { id, league: { id: leagueId } } } = getState().fplTeam
  const { filter, sort, page } = getState().players
  const { outListPosition: { position: { id: positionId } } } = getState().fplTeamList

  const query = {
    filter: { ...filter, leagueId, positionId },
    sort,
    page: { ...page, offset }
  }

  history.replace(`${FPL_TEAMS_URL}/${id}/waiverPicks/new?${qs.stringify(query)}`)
}

export const fetchTradeableListPositions = ({ sort, filter }: Props) => (dispatch, getState) => {
  dispatch({ type: API_LIST_POSITION_TRADEABLE_LIST_POSITIONS, sort, filter })

  const { outListPosition: { id } } = getState().fplTeamList
  const url =
    `${API_URL}${API_LIST_POSITIONS_PATH}/${id}/tradeable_list_positions?${stringify({ sort: sort || {}, filter: filter || {} })}`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url,
    successAction: success(API_LIST_POSITION_TRADEABLE_LIST_POSITIONS),
    failureAction: failure(API_LIST_POSITION_TRADEABLE_LIST_POSITIONS)
  }))
}

export const fetchTradeableListPositionFacets = () => (dispatch, getState) => {
  dispatch({ type: API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS })

  const { outListPosition: { id } } = getState().fplTeamList
  const url = `${API_URL}${API_LIST_POSITIONS_PATH}/${id}/tradeable_list_position_facets`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url,
    successAction: success(API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS),
    failureAction: failure(API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS)
  }))
}

export const updateTradeableListPositionsFilter = (filter: Filter) => (dispatch, getState) => {
  dispatch({ type: UPDATE_TRADEABLE_LIST_POSITIONS_FILTER, filter })

  const { data: { id, league: { id: leagueId } } } = getState().fplTeam
  const { sort } = getState().listPosition
  const { outListPosition: { position: { id: positionId } } } = getState().fplTeamList

  const query = { filter: { ...filter, leagueId, positionId }, sort }

  history.replace(`${FPL_TEAMS_URL}/${id}/teamTrades/new?${qs.stringify(query)}`)
}

export const updateTradeableListPositionsSort = (sort: Sort) => (dispatch, getState) => {
  dispatch({ type: UPDATE_TRADEABLE_LIST_POSITIONS_SORT, sort })

  const { data: { id, league: { id: leagueId } } } = getState().fplTeam
  const { filter } = getState().listPosition
  const { outListPosition: { position: { id: positionId } } } = getState().fplTeamList

  const query = { filter: { ...filter, leagueId, positionId }, sort }

  history.replace(`${FPL_TEAMS_URL}/${id}/teamTrades/new?${qs.stringify(query)}`)
}
