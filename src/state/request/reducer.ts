import * as actions from './actions'

import { APPLICATION_ERRORS } from 'utilities/constants'


type RequestError = {
  url: string,
  status: string,
  statusText?: string,
  errors?: any
}

type Action = {
  type: string,
  error?: RequestError
}

export type State = {
  inFlight: number,
  errors: RequestError[]
}

const initialState = {
  inFlight: 0,
  errors: []
}

const isKnownError = (status: string) => APPLICATION_ERRORS.hasOwnProperty(status)

const reducer = (state: State, action: Action) => {
  if (state === undefined) { state = initialState }
  switch (action.type) {
    case actions.UNAUTHED_REQUEST:
    case actions.AUTHED_REQUEST:
      return { ...state, inFlight: (state.inFlight + 1) }
    case actions.REQUEST_DONE:
      return { ...state, inFlight: (state.inFlight - 1) }
    case actions.REQUEST_VALIDATION_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.error]
      }
    case actions.ADD_REQUEST_ERROR:
      const { error } = action
      if (!error || !isKnownError(error.status)) {
        return state
      }

      return {
        ...state,
        errors: [...state.errors, error]
      }
    case actions.CLEAR_REQUEST_ERRORS:
      return {
        ...state,
        errors: []
      }
    default:
      return state
  }
}

export default reducer
