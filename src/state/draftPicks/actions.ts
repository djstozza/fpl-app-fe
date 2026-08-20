import { decamelizeKeys } from 'humps'
import qs from 'qs'

import { apiRequest } from 'state/request/actions'
import history from 'state/history'
import { stringify } from 'utilities/helpers'

import { API_URL, LEAGUES_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'

import type { Filter, Sort } from 'types'

export const API_LEAGUE_DRAFT_PICKS_INDEX = 'API_LEAGUE_DRAFT_PICKS_INDEX'
export const API_LEAGUE_DRAFT_PICKS_FACETS_INDEX = 'API_LEAGUE_DRAFT_PICKS_FACETS_INDEX'
export const API_LEAGUE_DRAFT_PICK_UPDATE = 'API_LEAGUE_DRAFT_PICK_UPDATE'
export const API_LEAGUE_DRAFT_PICKS_STATUS_INDEX = 'API_LEAGUE_DRAFT_PICKS_STATUS_INDEX'
export const UPDATE_DRAFT_PICKS_FILTER = 'UPDATE_DRAFT_PICKS_FILTER'
export const UPDATE_DRAFT_PICKS_SORT = 'UPDATE_DRAFT_PICKS_SORT'

type Props = {
  sort: Sort,
  filter?: Filter
}

type UpdateDraftProps = {
  playerId?: string,
  miniDraft?: boolean,
  nextDraftPickId: string
}

export const fetchDraftPicks = ({ sort, filter }: Props) => (dispatch, getState) => {
  dispatch({ type: API_LEAGUE_DRAFT_PICKS_INDEX, sort, filter })

  const { data: { id } } = getState().league
  const url = `${API_URL}${LEAGUES_URL}/${id}/draft_picks?${stringify({ sort, filter: filter || {} })}`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url,
    successAction: success(API_LEAGUE_DRAFT_PICKS_INDEX),
    failureAction: failure(API_LEAGUE_DRAFT_PICKS_INDEX)
  }))
}

export const fetchDraftPickFacets = () => (dispatch, getState) => {
  dispatch({ type: API_LEAGUE_DRAFT_PICKS_FACETS_INDEX })

  const { data: { id } } = getState().league
  const url = `${API_URL}${LEAGUES_URL}/${id}/draft_picks/facets`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url,
    successAction: success(API_LEAGUE_DRAFT_PICKS_FACETS_INDEX),
    failureAction: failure(API_LEAGUE_DRAFT_PICKS_FACETS_INDEX)
  }))
}

export const updateFilter = (filter: Filter) => (dispatch, getState) => {
  dispatch({ type: UPDATE_DRAFT_PICKS_FILTER, filter })

  const { data: { id } } = getState().league
  const { sort } = getState().draftPicks

  const query = { filter, sort }

  history.push(`${LEAGUES_URL}/${id}/draft/draftPicks?${qs.stringify(query)}`)
}

export const updateSort = (sort: Sort) => (dispatch, getState) => {
  dispatch({ type: UPDATE_DRAFT_PICKS_SORT, sort })

  const { data: { id } } = getState().league
  const { filter } = getState().draftPicks

  const query = { filter, sort }

  history.push(`${LEAGUES_URL}/${id}/draft/draftPicks?${qs.stringify(query)}`)
}

export const fetchDraftPicksStatus = (leagueId: string) => (dispatch) => {
  dispatch({ type: API_LEAGUE_DRAFT_PICKS_STATUS_INDEX, leagueId })

  const url = `${API_URL}${LEAGUES_URL}/${leagueId}/draft_picks/status`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url,
    successAction: success(API_LEAGUE_DRAFT_PICKS_STATUS_INDEX),
    failureAction: failure(API_LEAGUE_DRAFT_PICKS_STATUS_INDEX)
  }))
}

export const updateDraftPick = ({ playerId, miniDraft, nextDraftPickId }: UpdateDraftProps) =>
  async (dispatch, getState) => {
    dispatch({ type: API_LEAGUE_DRAFT_PICK_UPDATE, playerId, miniDraft, nextDraftPickId })

    const { data: { id } } = getState().league
    const { filter, sort } = getState().draftPicks
    const url = `${API_URL}${LEAGUES_URL}/${id}/draft_picks/${nextDraftPickId}?${stringify({ sort, filter })}`

    const ok = await dispatch(apiRequest({
      needsAuth: true,
      method: 'PUT',
      url,
      body: { league: decamelizeKeys({ playerId, miniDraft }) },
      successAction: success(API_LEAGUE_DRAFT_PICK_UPDATE),
      failureAction: failure(API_LEAGUE_DRAFT_PICK_UPDATE)
    }))

    if (ok) {
      const { data: { id: updatedId } } = getState().league
      dispatch(fetchDraftPicksStatus(updatedId))
      history.replace(`${LEAGUES_URL}/${updatedId}/draft`)
    }
  }
