import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Error } from 'types'

import type { FplTeamList, ListPosition } from 'types'

export type State = {
  data?: FplTeamList
  listPositions: ListPosition[],
  outListPosition?: ListPosition,
  submitting: boolean,
  fetching: boolean,
  errors: Error[]
}

export const initialState = {
  listPositions: [],
  submitting: false,
  errors: [],
  fetching: false
}

type FplTeamListAction = {
  outListPosition?: ListPosition
} & Action

const reducer = (state: State = initialState, action: FplTeamListAction) => {
  const { data, errors, outListPosition } = action

  switch (action.type) {
    case success(actions.API_FPL_TEAM_LISTS_SHOW):
      return { ...state, data }
    case actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX:
      return { ...state, fetching: true }
    case success(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX):
    case success(actions.API_FPL_TEAM_LISTS_UPDATE):
      const { data: listPositions = [] } = action
      return { ...state, listPositions, submitting: false, fetching: false }
    case actions.API_FPL_TEAM_LISTS_UPDATE:
      return { ...state, submitting: true }
    case actions.SET_OUT_LIST_POSITION:
      return { ...state, outListPosition }
    case failure(actions.API_FPL_TEAM_LISTS_SHOW):
    case failure(actions.API_FPL_TEAM_LISTS_UPDATE):
    case failure(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX):
      return { ...state, errors, submitting: false, fetching: false }
    default:
      return state
  }
}

export default reducer
