import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, RoundSummary } from 'types'

export type State = {
  data: RoundSummary[],
  errors: Object[]
}

export const initialState = {
  data: [],
  errors: []
}

const reducer = (state: State = initialState, action: Action) => {
  const { data = [], errors } = action

  switch (action.type) {
    case success(actions.API_ROUNDS_INDEX):

      return { ...state, data }
    case failure(actions.API_ROUNDS_INDEX):
      return { ...state, errors }
    default:
      return state
  }
}

export default reducer
