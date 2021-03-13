import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Round } from 'types'

export type State = {
  data: Round[],
  errors: Object[]
}

export const initialState = {
  data: [],
  errors: []
}

const reducer = (state: State = initialState, action: Action) => {
  if (state === undefined) { state = initialState }
  switch (action.type) {
    case success(actions.API_ROUNDS_INDEX):
      const { data = [] } = action

      return { ...state, data }
    case failure(actions.API_ROUNDS_INDEX):
      const { errors } = action

      return { ...state, errors }
    default:
      return state
  }
}

export default reducer
