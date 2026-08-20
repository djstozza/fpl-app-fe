import { decamelizeKeys } from 'humps'
import qs from 'qs'

import history from 'state/history'
import { apiRequest } from 'state/request/actions'
import { fetchPlayers } from 'state/players/actions'
import { stringify } from 'utilities/helpers'

import { API_URL, LEAGUES_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'

import type { Filter, Sort } from 'types'

export const API_LEAGUES_SHOW = 'API_LEAGUES_SHOW'
export const API_LEAGUES_UPDATE = 'API_LEAGUES_UPDATE'
export const API_LEAGUE_FPL_TEAMS_INDEX = 'API_LEAGUE_FPL_TEAMS_INDEX'
export const API_LEAGUE_GENERATE_DRAFT_PICKS = 'API_LEAGUE_GENERATE_DRAFT_PICKS'
export const API_LEAGUE_CREATE_DRAFT = 'API_LEAGUE_CREATE_DRAFT'
export const UPDATE_LEAGUE_FPL_TEAMS_SORT = 'UPDATE_LEAGUE_FPL_TEAMS_SORT'
export const FETCH_AVAILABLE_PLAYERS = 'FETCH_AVAILABLE_PLAYERS'
export const UPDATE_AVAILABLE_PLAYERS_SORT = 'UPDATE_AVAILABLE_PLAYERS_SORT'
export const UPDATE_AVAILABLE_PLAYERS_FILTER = 'UPDATE_AVAILABLE_PLAYERS_FILTER'
export const UPDATE_AVAILABLE_PLAYERS_PAGE = 'UPDATE_AVAILABLE_PLAYERS_PAGE'
export const INITIALIZE_FORM = 'INITIALIZE_FORM'

type LeagueProps = {
  name: string,
  code: string
}

type Page = { offset?: string | number, limit?: string | number }

type AvailablePlayersProps = {
  filter?: Filter,
  sort?: Sort,
  page?: Page
}

export const fetchLeague = (leagueId: string) => (dispatch) => {
  dispatch({ type: API_LEAGUES_SHOW, leagueId })

  const url = `${API_URL}${LEAGUES_URL}/${leagueId}`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url,
    successAction: success(API_LEAGUES_SHOW),
    failureAction: failure(API_LEAGUES_SHOW)
  }))
}

export const updateLeague = ({ league }: { league: LeagueProps }) => async (dispatch, getState) => {
  dispatch({ type: API_LEAGUES_UPDATE, league })

  const { data: { id } } = getState().league
  const url = `${API_URL}${LEAGUES_URL}/${id}`

  const ok = await dispatch(apiRequest({
    needsAuth: true,
    method: 'PUT',
    url,
    body: { league: decamelizeKeys(league) },
    successAction: success(API_LEAGUES_UPDATE),
    failureAction: failure(API_LEAGUES_UPDATE)
  }))

  if (ok) {
    const { data: { id: updatedId } } = getState().league
    history.replace(`${LEAGUES_URL}/${updatedId}`)
  }
}

export const fetchFplTeams = ({ sort }: { sort: Sort }) => (dispatch, getState) => {
  dispatch({ type: API_LEAGUE_FPL_TEAMS_INDEX, sort })

  const { data: { id } } = getState().league
  const url = `${API_URL}${LEAGUES_URL}/${id}/fpl_teams?${stringify({ sort })}`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url,
    successAction: success(API_LEAGUE_FPL_TEAMS_INDEX),
    failureAction: failure(API_LEAGUE_FPL_TEAMS_INDEX)
  }))
}

export const updateFplTeamsSort = ({ sort }: { sort: Sort }) => (dispatch, getState) => {
  dispatch({ type: UPDATE_LEAGUE_FPL_TEAMS_SORT, sort })

  const { data: { id } } = getState().league

  history.push(`${LEAGUES_URL}/${id}/fplTeams?${qs.stringify({ sort })}`)
}

export const generateDraftPicks = (leagueId: string) => async (dispatch, getState) => {
  dispatch({ type: API_LEAGUE_GENERATE_DRAFT_PICKS, leagueId })

  const url = `${API_URL}${LEAGUES_URL}/${leagueId}/generate_draft_picks`

  const ok = await dispatch(apiRequest({
    needsAuth: true,
    method: 'POST',
    url,
    successAction: success(API_LEAGUE_GENERATE_DRAFT_PICKS),
    failureAction: failure(API_LEAGUE_GENERATE_DRAFT_PICKS)
  }))

  if (ok) {
    const { data: { id } } = getState().league
    const sort = { draft_pick_number: 'asc' }

    history.replace(`${LEAGUES_URL}/${id}/fplTeams?${stringify({ sort })}`)
    dispatch(fetchLeague(id))
  }
}

export const createDraft = (leagueId: string) => (dispatch) => {
  dispatch({ type: API_LEAGUE_CREATE_DRAFT, leagueId })

  const url = `${API_URL}${LEAGUES_URL}/${leagueId}/create_draft`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'POST',
    url,
    successAction: success(API_LEAGUE_CREATE_DRAFT),
    failureAction: failure(API_LEAGUE_CREATE_DRAFT)
  }))
}

export const fetchAvailablePlayers = ({ sort, filter, page }: AvailablePlayersProps) => (dispatch, getState) => {
  dispatch({ type: FETCH_AVAILABLE_PLAYERS, sort, filter, page })

  const { data: { id } } = getState().league

  dispatch(fetchPlayers({ filter: { ...filter, leagueId: id }, sort, page }))
}

export const updateAvailablePlayersSort = (sort: Sort) => (dispatch, getState) => {
  dispatch({ type: UPDATE_AVAILABLE_PLAYERS_SORT, sort })

  const { data: { id } } = getState().league
  const { filter, page } = getState().players

  const query = { filter, sort, page }

  history.push(`${LEAGUES_URL}/${id}/draft/availablePlayers?${qs.stringify(query)}`)
}

export const updateAvailablePlayersFilter = (filter: Filter) => (dispatch, getState) => {
  dispatch({ type: UPDATE_AVAILABLE_PLAYERS_FILTER, filter })

  const { data: { id } } = getState().league
  const { sort, page } = getState().players

  const query = { filter, sort, page: { ...page, offset: 0 } }

  history.push(`${LEAGUES_URL}/${id}/draft/availablePlayers?${qs.stringify(query)}`)
}

export const updateAvailablePlayersPage = (offset: string) => (dispatch, getState) => {
  dispatch({ type: UPDATE_AVAILABLE_PLAYERS_PAGE, offset })

  const { data: { id } } = getState().league
  const { filter, sort, page } = getState().players

  const query = { filter, sort, page: { ...page, offset } }

  history.push(`${LEAGUES_URL}/${id}/draft/availablePlayers?${qs.stringify(query)}`)
}

export const initializeForm = () => ({ type: INITIALIZE_FORM })
