import qs from 'qs'
import { stringify } from 'utilities/helpers'

import { API_URL, PLAYERS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import { apiRequest } from 'state/request/actions'
import history from 'state/history'

export const API_PLAYERS_INDEX = 'API_PLAYERS_INDEX'
export const API_PLAYERS_FACETS_INDEX = 'API_PLAYERS_FACETS_INDEX'
export const UPDATE_PLAYERS_FILTER = 'UPDATE_PLAYERS_FILTER'
export const UPDATE_PLAYERS_SORT = 'UPDATE_PLAYERS_SORT'
export const UPDATE_PLAYERS_PAGE = 'UPDATE_PLAYERS_PAGE'

type Props = {
  filter?: any,
  sort?: any,
  page?: any
}

export const fetchPlayers = ({ sort, filter, page }: Props) => (dispatch, _getState) => {
  dispatch({ type: API_PLAYERS_INDEX, sort, filter, page })

  const url = `${API_URL}${PLAYERS_URL}?${stringify({ sort, filter, page })}`

  return dispatch(apiRequest({
    needsAuth: false,
    method: 'GET',
    url,
    successAction: success(API_PLAYERS_INDEX),
    failureAction: failure(API_PLAYERS_INDEX)
  }))
}

export const fetchFacets = () => (dispatch, _getState) => {
  dispatch({ type: API_PLAYERS_FACETS_INDEX })

  return dispatch(apiRequest({
    needsAuth: false,
    method: 'GET',
    url: `${API_URL}${PLAYERS_URL}/facets`,
    successAction: success(API_PLAYERS_FACETS_INDEX),
    failureAction: failure(API_PLAYERS_FACETS_INDEX)
  }))
}

export const updateFilter = (filter: any) => (dispatch, getState) => {
  dispatch({ type: UPDATE_PLAYERS_FILTER, filter })

  const { sort, page } = getState().players
  const query = { filter, sort, page: { ...page, offset: 0 } }

  history.push(`${PLAYERS_URL}?${qs.stringify(query)}`)
}

export const updateSort = (sort: any) => (dispatch, getState) => {
  dispatch({ type: UPDATE_PLAYERS_SORT, sort })

  const { filter, page } = getState().players
  const query = { filter, sort, page }

  history.push(`${PLAYERS_URL}?${qs.stringify(query)}`)
}

export const updatePage = (offset: string) => (dispatch, getState) => {
  dispatch({ type: UPDATE_PLAYERS_PAGE, offset })

  const { filter, sort, page } = getState().players
  const query = { filter, sort, page: { ...page, offset } }

  history.push(`${PLAYERS_URL}?${qs.stringify(query)}`)
}
