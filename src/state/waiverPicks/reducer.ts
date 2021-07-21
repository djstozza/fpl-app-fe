import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Error, WaiverPick } from 'types'

export type State = {
  data: WaiverPick[],
  errors: Error[],
  submitting: boolean
}

export const initialState = {
  data: [],
  submitting: false,
  errors: []
}

const reducer = (state: State = initialState, action: Action) => {
  if (state === undefined) { state = initialState }

  const {
    data = [],
    errors
  } = action

  switch (action.type) {
    case actions.API_LIST_POSITION_WAIVER_PICKS_CREATE:
    case actions.API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER:
      return { ...state, submitting: true }
    case success(actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX):
    case success(actions.API_LIST_POSITION_WAIVER_PICKS_CREATE):
    case success(actions.API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER):
      return { ...state, data, submitting: false, errors: [] }
    case failure(actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX):
    case failure(actions.API_LIST_POSITION_WAIVER_PICKS_CREATE):
    case failure(actions.API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER):
      return { ...state, errors, submitting: false }
    default:
      return state
  }
}

export default reducer
