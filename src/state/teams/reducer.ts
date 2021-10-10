import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, TeamSummary } from 'types'

export type State = {
  data: TeamSummary[],
  errors: Object[],
  page: Object,
  sort: Object,
  fetching: boolean
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
  fetching: false,
  ...initialFilterState
}

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case actions.API_TEAMS_INDEX:
      const { sort } = action

      return { ...state, sort, fetching: true }
    case success(actions.API_TEAMS_INDEX):
      const { data = [] } = action

      return { ...state, data, fetching: false }
    case failure(actions.API_TEAMS_INDEX):
      const { errors } = action

      return { ...state, errors, fetching: false }
    default:
      return state
  }
}

export default reducer
