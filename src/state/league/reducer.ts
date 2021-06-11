import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Error } from 'types'

import type { League, FplTeam } from 'types'

export type State = {
  data?: League,
  fplTeams: FplTeam[]
  submitting: boolean,
  errors: Error[],
  sort?: Object
}

export const initialFilterState = {
  sort: {
    name: 'asc'
  }
}

export const initialState = {
  submitting: false,
  fplTeams: [],
  errors: [],
  ...initialFilterState
}

const reducer = (state: State = initialState, action: Action) => {
  if (state === undefined) { state = initialState }
  const { data, sort, errors } = action

  switch (action.type) {
    case actions.API_LEAGUES_UPDATE:
    case actions.API_LEAGUE_GENERATE_DRAFT_PICKS:
      return { ...state, submitting: true }
    case success(actions.API_LEAGUES_SHOW):
    case success(actions.API_LEAGUES_UPDATE):
      return { ...initialState, data }
    case success(actions.API_LEAGUE_FPL_TEAMS_INDEX):
    case success(actions.API_LEAGUE_GENERATE_DRAFT_PICKS):
      const { data: fplTeams = [] } = action

      return { ...state, fplTeams, submitting: false }
    case actions.UPDATE_LEAGUE_FPL_TEAMS_SORT:
      return { ...state, sort }
    case failure(actions.API_LEAGUES_SHOW):
    case failure(actions.API_LEAGUES_UPDATE):
    case failure(actions.API_LEAGUE_GENERATE_DRAFT_PICKS):
    case failure(actions.API_LEAGUE_FPL_TEAMS_INDEX):
      return { ...state, errors, submitting: false }
    default:
      return state
  }
}

export default reducer
