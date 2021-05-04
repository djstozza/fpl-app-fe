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
  if (state === undefined) { state = initialState }
  switch (action.type) {
    case actions.API_SESSIONS_CREATE:
      return { ...state, submitting: true }
    case success(actions.API_SESSIONS_CREATE):
      const { data: { token } } = action

      return { ...state, token, submitting: false }
    case failure(actions.API_SESSIONS_CREATE):
      const { errors } = action

      return { ...state, errors, submitting: false }
    default:
      return state
  }
}

export default reducer
