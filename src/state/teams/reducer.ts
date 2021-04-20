import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, TeamSummary } from 'types'

export type State = {
  data: TeamSummary[],
  errors: Object[],
  page: Object,
  sort: Object
}

export const initialFilterState = {
  page: { offset: 0, limit: 50 },
  sort: {
    position: 'asc'
  }
}

export const initialState = {
  data: [],
  errors: [],
  ...initialFilterState
}

const reducer = (state: State = initialState, action: Action) => {
  if (state === undefined) { state = initialState }
  switch (action.type) {
    case actions.API_TEAMS_INDEX:
      const { sort } = action

      return { ...state, sort }
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
