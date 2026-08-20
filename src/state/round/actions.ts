import { API_URL, ROUNDS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import { apiRequest } from 'state/request/actions'

export const API_ROUNDS_SHOW = 'API_ROUNDS_SHOW'

export const fetchRound = (roundId: number) => (dispatch) => {
  dispatch({ type: API_ROUNDS_SHOW, roundId })

  return dispatch(apiRequest({
    needsAuth: false,
    method: 'GET',
    url: `${API_URL}${ROUNDS_URL}/${roundId}`,
    successAction: success(API_ROUNDS_SHOW),
    failureAction: failure(API_ROUNDS_SHOW)
  }))
}
