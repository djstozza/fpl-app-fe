import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Error } from 'types'

export type State = {
  data?: {
    token?: string
  },
  submitting: boolean,
  errors: Error[]
}

export const initialState = {
  errors: [],
  submitting: false
}

const reducer = (state: State = initialState, action: Action) => {
  const { data: { token, user } = {}, errors } = action

  switch (action.type) {
    case actions.INITIALIZE_AUTH:
      return { ...state, errors: [] }
    case actions.API_SESSIONS_CREATE:
      return { ...state, submitting: true }
    case success(actions.API_SESSIONS_CREATE):
    case success(actions.API_USERS_CREATE):
    case success(actions.API_SESSIONS_UPDATE):
      return { ...state, token, user, errors: [], submitting: false }
    case success(actions.API_USERS_UPDATE):
    case success(actions.API_PASSWORDS_UPDATE):
      return { ...state, user, errors: [], submitting: false }
    case failure(actions.API_SESSIONS_CREATE):
    case failure(actions.API_USERS_CREATE):
    case failure(actions.API_USERS_UPDATE):
    case failure(actions.API_PASSWORDS_UPDATE):
      return { ...state, errors, submitting: false }
    case actions.LOG_OUT:
    case failure(actions.API_SESSIONS_UPDATE):
      return initialState
    default:
      return state
  }
}

export default reducer
