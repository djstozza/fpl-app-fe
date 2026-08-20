import history from 'state/history'
import { stringify } from 'utilities/helpers'
import { apiRequest } from 'state/request/actions'

import {
  API_URL,
  PROFILE_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAMS_PATH,
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

export const API_FPL_TEAMS_INDEX = 'API_FPL_TEAMS_INDEX'
export const UPDATE_FPL_TEAMS_SORT = 'UPDATE_FPL_TEAMS_SORT'

export const fetchFplTeams = () => (dispatch) => {
  dispatch({ type: API_FPL_TEAMS_INDEX })

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url: `${API_URL}${API_FPL_TEAMS_PATH}`,
    successAction: success(API_FPL_TEAMS_INDEX),
    failureAction: failure(API_FPL_TEAMS_INDEX)
  }))
}

export const updateFplTeamsSort = (sort: { [key: string]: string }) => (dispatch) => {
  dispatch({ type: UPDATE_FPL_TEAMS_SORT, sort })
  history.push(`${PROFILE_URL}${FPL_TEAMS_URL}?${stringify({ sort })}`)
}
