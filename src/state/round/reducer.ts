import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Round } from 'types'

export type State = {
  data?: Round,
  errors: Object[]
}

export const initialState = {
  data: undefined,
  errors: []
}

const reducer = (state: State = initialState, action: Action) => {
  const { data, errors } = action

  switch (action.type) {
    case success(actions.API_ROUNDS_SHOW):
      if (data) return { ...state, data }

      return state
    case failure(actions.API_ROUNDS_SHOW):
      return { ...state, errors }
    default:
      return state
  }
}

export default reducer
