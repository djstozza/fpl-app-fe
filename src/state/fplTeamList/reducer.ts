import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Error } from 'types'

import type { FplTeamList, ListPosition } from 'types'

export type State = {
  data?: FplTeamList
  listPositions: ListPosition[],
  submitting: boolean,
  errors: Error[]
}

export const initialState = {
  listPositions: [],
  submitting: false,
  errors: []
}

type FplTeamListAction = {
  listPositions: ListPosition[]
} & Action

const reducer = (state: State = initialState, action: FplTeamListAction) => {
  if (state === undefined) { state = initialState }
  const { data, errors } = action

  switch (action.type) {
    case success(actions.API_FPL_TEAM_LISTS_SHOW):
      return { ...state, data }
    case success(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX):
    case success(actions.API_FPL_TEAM_LISTS_UPDATE):
      const { data: listPositions = [] } = action
      return { ...state, listPositions, submitting: false }
    case actions.API_FPL_TEAM_LISTS_UPDATE:
      return { ...state, submitting: true }
    case failure(actions.API_FPL_TEAM_LISTS_SHOW):
    case failure(actions.API_FPL_TEAM_LISTS_UPDATE):
      return { ...state, errors, submitting: false }
    default:
      return state
  }
}

export default reducer
