import { API_URL, ROUNDS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import { apiRequest } from 'state/request/actions'

export const API_ROUNDS_INDEX = 'API_ROUNDS_INDEX'

export const fetchRounds = () => (dispatch, _getState) => {
  dispatch({ type: API_ROUNDS_INDEX })

  return dispatch(apiRequest({
    needsAuth: false,
    method: 'GET',
    url: `${API_URL}${ROUNDS_URL}`,
    successAction: success(API_ROUNDS_INDEX),
    failureAction: failure(API_ROUNDS_INDEX)
  }))
}
