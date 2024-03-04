import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Error } from 'types'

import type { League, FplTeam } from 'types'

export type State = {
  data?: League,
  fplTeams: FplTeam[]
  submitting: boolean,
  errors: Error[],
  sort?: Object,
  fetching: boolean
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
  fetching: false,
  ...initialFilterState
}

const reducer = (state: State = initialState, action: Action) => {
  const { data, sort, errors } = action

  switch (action.type) {
    case actions.API_LEAGUES_UPDATE:
    case actions.API_LEAGUE_GENERATE_DRAFT_PICKS:
    case actions.API_LEAGUE_CREATE_DRAFT:
      return { ...state, submitting: true }
    case actions.API_LEAGUE_FPL_TEAMS_INDEX:
      return { ...state, fetching: true }
    case success(actions.API_LEAGUES_SHOW):
      return { ...state, data }
    case success(actions.API_LEAGUES_UPDATE):
      return { ...initialState, data, submitting: false }
    case success(actions.API_LEAGUE_FPL_TEAMS_INDEX):
    case success(actions.API_LEAGUE_GENERATE_DRAFT_PICKS):
      return { ...state, fplTeams: data || [], submitting: false, fetching: false }
    case actions.UPDATE_LEAGUE_FPL_TEAMS_SORT:
      return { ...state, sort }
    case actions.INITIALIZE_FORM:
      return { ...initialState, data: state.data }
    case success(actions.API_LEAGUE_CREATE_DRAFT):
      return { ...state, errors: [], data, submitting: false }
    case failure(actions.API_LEAGUES_SHOW):
    case failure(actions.API_LEAGUES_UPDATE):
    case failure(actions.API_LEAGUE_GENERATE_DRAFT_PICKS):
    case failure(actions.API_LEAGUE_FPL_TEAMS_INDEX):
    case failure(actions.API_LEAGUE_CREATE_DRAFT):
      return { ...state, errors, submitting: false, fetching: false }
    default:
      return state
  }
}

export default reducer
