import { decamelizeKeys } from 'humps'

import history from 'state/history'
import { apiRequest } from 'state/request/actions'

import {
  API_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAMS_PATH,
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

export const API_FPL_TEAMS_SHOW = 'API_FPL_TEAMS_SHOW'
export const API_FPL_TEAMS_UPDATE = 'API_FPL_TEAMS_UPDATE'

type Props = {
  fplTeam: { name: string }
}

export const fetchFplTeam = (fplTeamId: string) => (dispatch, _getState) => {
  dispatch({ type: API_FPL_TEAMS_SHOW, fplTeamId })

  const url = `${API_URL}${API_FPL_TEAMS_PATH}/${fplTeamId}`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url,
    successAction: success(API_FPL_TEAMS_SHOW),
    failureAction: failure(API_FPL_TEAMS_SHOW)
  }))
}

export const updateFplTeam = ({ fplTeam }: Props) => async (dispatch, getState) => {
  dispatch({ type: API_FPL_TEAMS_UPDATE, fplTeam })

  const { data: { id } } = getState().fplTeam
  const url = `${API_URL}${API_FPL_TEAMS_PATH}/${id}`

  const ok = await dispatch(apiRequest({
    needsAuth: true,
    method: 'PUT',
    url,
    body: { fpl_team: decamelizeKeys(fplTeam) },
    successAction: success(API_FPL_TEAMS_UPDATE),
    failureAction: failure(API_FPL_TEAMS_UPDATE)
  }))

  if (ok) {
    const { data: { id: updatedId } } = getState().fplTeam
    history.replace(`${FPL_TEAMS_URL}/${updatedId}`)
  }
}
