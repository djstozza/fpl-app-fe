import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, TeamSummary } from 'types'

export type State = {
  data: TeamSummary[],
  errors: Object[]
}

export const initialState = {
  data: [],
  errors: []
}

const reducer = (state: State = initialState, action: Action) => {
  if (state === undefined) { state = initialState }
  switch (action.type) {
    case success(actions.API_TEAMS_INDEX):
      const { data = [] } = action

      return { ...state, data }
    case failure(actions.API_TEAMS_INDEX):
      const { errors } = action

      return { ...state, errors }
    default:
      return state
  }
}

export default reducer
