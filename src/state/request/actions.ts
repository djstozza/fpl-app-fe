import { camelizeKeys } from 'humps'

import { getData } from '../../api'

export const AUTHED_REQUEST = 'AUTHED_REQUEST'
export const UNAUTHED_REQUEST = 'UNAUTHED_REQUEST'
export const REQUEST_DONE = 'REQUEST_DONE'
export const REQUEST_FAIL = 'REQUEST_FAIL'
export const ADD_REQUEST_ERROR = 'ADD_REQUEST_ERROR'
export const REQUEST_VALIDATION_ERROR = 'REQUEST_VALIDATION_ERROR'
export const CLEAR_REQUEST_ERRORS = 'CLEAR_REQUEST_ERRORS'

export const clearRequestErrors = () => ({
  type: CLEAR_REQUEST_ERRORS
})

type ApiRequestParams = {
  needsAuth: boolean,
  method?: string,
  url: string,
  body?: Object,
  successAction: string,
  failureAction: string
}

// Replaces the old sendRequest/requestFail saga pair. Dispatches the same
// AUTHED_REQUEST/UNAUTHED_REQUEST/REQUEST_DONE/ADD_REQUEST_ERROR action types
// the request reducer already switches on, so it stays untouched. Returns
// whether the request succeeded, so callers can chain follow-up side effects
// (history navigation, refetches) the way saga-on-saga-success watchers used to.
export const apiRequest = (
  { needsAuth, method, url, body, successAction, failureAction }: ApiRequestParams
) => async (dispatch, getState): Promise<boolean> => {
  dispatch({ type: needsAuth ? AUTHED_REQUEST : UNAUTHED_REQUEST, method, url, body, successAction, failureAction })

  try {
    const token = needsAuth ? getState().auth.token : undefined
    const response = await getData(url, { method, body, token })
    const { ok, status, statusText, body: result } = response

    if (!ok || result.errors) {
      const errors = camelizeKeys(result.errors || [])

      dispatch({ type: failureAction, status, errors })
      dispatch({ type: ADD_REQUEST_ERROR, error: { url, status, statusText, errors } })

      return false
    }

    dispatch({ type: successAction, ...camelizeKeys(result) })

    return true
  } catch (e) {
    dispatch({ type: failureAction, errors: [camelizeKeys(e)] })
    dispatch({ type: ADD_REQUEST_ERROR, error: { url, status: 'failed_to_fetch' } })

    return false
  } finally {
    dispatch({ type: REQUEST_DONE })
  }
}
