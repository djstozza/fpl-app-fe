import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Team } from 'types'

export type State = {
  data?: Team,
  errors: Object[],
  sort: Object
}

type TeamAction = {
  sort: Object
} & Action

export const initialState = {
  sort: {
    players: {
      totalPoints: 'desc'
    }
  },
  errors: []
}

const reducer = (state: State = initialState, action: TeamAction) => {
  if (state === undefined) { state = initialState }
  switch (action.type) {
    case success(actions.API_TEAMS_SHOW):
      const { data } = action
      if (data) return { ...state, data }

      return state
    case actions.FETCH_TEAM_PLAYERS:
      const { sort } = action

      return { ...state, sort }
    case failure(actions.API_TEAMS_SHOW):
      const { errors } = action

      return { ...state, errors }
    default:
      return state
  }
}

export default reducer
