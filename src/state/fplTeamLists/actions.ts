import { stringify } from 'utilities/helpers'
import { apiRequest } from 'state/request/actions'

import {
  API_URL,
  API_FPL_TEAM_LISTS_PATH,
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

export const API_FPL_TEAM_LISTS_INDEX = 'API_FPL_TEAM_LISTS_INDEX'

export const fetchFplTeamLists = (fplTeamId: string) => (dispatch, _getState) => {
  dispatch({ type: API_FPL_TEAM_LISTS_INDEX, fplTeamId })

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}?${stringify({ fplTeamList: { fplTeamId } })}`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url,
    successAction: success(API_FPL_TEAM_LISTS_INDEX),
    failureAction: failure(API_FPL_TEAM_LISTS_INDEX)
  }))
}
