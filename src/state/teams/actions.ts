import qs from 'qs'
import { decamelizeKeys } from 'humps'

import { API_URL, TEAMS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import { apiRequest } from 'state/request/actions'
import history from 'state/history'

export const API_TEAMS_INDEX = 'API_TEAMS_INDEX'
export const GET_NEW_SORT = 'GET_NEW_SORT'
export const UPDATE_TEAMS_SORT = 'UPDATE_TEAMS_SORT'

export const fetchTeams = ({ sort }:{ sort: Object }) => (dispatch, _getState) => {
  dispatch({ type: API_TEAMS_INDEX, sort })

  const url = `${API_URL}${TEAMS_URL}?${qs.stringify(decamelizeKeys({ sort }))}`

  return dispatch(apiRequest({
    needsAuth: false,
    method: 'GET',
    url,
    successAction: success(API_TEAMS_INDEX),
    failureAction: failure(API_TEAMS_INDEX)
  }))
}

export const updateSort = (sort: Object) => (dispatch, _getState) => {
  dispatch({ type: UPDATE_TEAMS_SORT, sort })
  history.push(`${TEAMS_URL}?${qs.stringify({ sort })}`)
}
