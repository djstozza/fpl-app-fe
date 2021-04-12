import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Team, TeamFixture, TeamPlayer } from 'types'

export type State = {
  data?: Team,
  fixtures: TeamFixture[],
  players: TeamPlayer[],
  errors: Object[],
  sort: Object
}

type TeamAction = {
  sort: {
    players: {
      [key: string]: string
    },
    fixtures: {
      [key: string]: string
    }
  }
} & Action

export const initialState = {
  sort: {
    players: {
      totalPoints: 'desc'
    },
    fixtures: {
      kickoffTime: 'asc'
    }
  },
  fixtures: [],
  players: [],
  errors: []
}

const reducer = (state: any = initialState, action: TeamAction) => {
  if (state === undefined) { state = initialState }
  switch (action.type) {
    case success(actions.API_TEAMS_SHOW):
      const { data } = action
      if (data) return { ...state, data }

      return state
    case success(actions.API_TEAMS_FIXTURES_INDEX):
      const { data: fixtures } = action
      return { ...state, fixtures }
    case actions.UPDATE_SORT:
      const { sort } = action
      return { ...state, sort }
    case failure(actions.API_TEAMS_SHOW):
    case failure(actions.API_TEAMS_FIXTURES_INDEX):
      const { errors } = action

      return { ...state, errors }
    default:
      return state
  }
}

export default reducer
