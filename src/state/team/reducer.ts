import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Team, TeamFixture, TeamPlayer } from 'types'

export type State = {
  data: Team,
  fixtures: TeamFixture[],
  players: TeamPlayer[],
  errors: Object[],
  sort: Object,
  page: Object,
  fetching: boolean
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

export const initialFilterState = {
  page: { offset: 0, limit: 50 },
  sort: {
    players: {
      totalPoints: 'desc'
    },
    fixtures: {
      kickoffTime: 'asc'
    }
  }
}

export const initialState = {
  fixtures: [],
  players: [],
  errors: [],
  fetching: false,
  ...initialFilterState
}

const reducer = (state: any = initialState, action: TeamAction) => {
  const { data, sort, errors } = action
  switch (action.type) {
    case actions.API_TEAMS_SHOW:
      return { ...state, sort }
    case actions.API_TEAMS_FIXTURES_INDEX:
      return { ...state, fetching: true }
    case success(actions.API_TEAMS_SHOW):
      if (data) return { ...state, data }

      return state
    case success(actions.API_TEAMS_FIXTURES_INDEX):
      return { ...state, fixtures: data, fetching: false }
    case actions.UPDATE_TEAM_FIXTURES_SORT:
      return { ...state, sort: { ...state.sort, fixtures: sort } }
    case actions.UPDATE_TEAM_PLAYERS_SORT:
      return { ...state, sort: { ...state.sort, players: sort } }
    case failure(actions.API_TEAMS_SHOW):
    case failure(actions.API_TEAMS_FIXTURES_INDEX):
      return { ...state, errors, fetching: false }
    default:
      return state
  }
}

export default reducer
