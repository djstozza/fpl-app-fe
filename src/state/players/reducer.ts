import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, PlayerSummary } from 'types'

export type State = {
  data: PlayerSummary[],
  errors: Object[]
}

export const initialState = {
  data: [],
  errors: []
}

const reducer = (state: State = initialState, action: Action) => {
  if (state === undefined) { state = initialState }
  switch (action.type) {
    case success(actions.API_PLAYERS_INDEX):
      const { data = [] } = action

      return { ...state, data }
    case failure(actions.API_PLAYERS_INDEX):
      const { errors } = action

      return { ...state, errors }
    default:
      return state
  }
}

export default reducer
