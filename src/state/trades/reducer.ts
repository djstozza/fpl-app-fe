import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Error, Trade } from 'types'

export type State = {
  data: Trade[],
  errors: Error[],
  submitting: boolean
}

export const initialState = {
  data: [],
  submitting: false,
  errors: []
}

const reducer = (state: State = initialState, action: Action) => {
  const {
    data = [],
    errors
  } = action

  switch (action.type) {
    case actions.API_LIST_POSITION_TRADES_CREATE:
      return { ...state, submitting: true }
    case success(actions.API_FPL_TEAM_LIST_TRADES_INDEX):
    case success(actions.API_LIST_POSITION_TRADES_CREATE):
      return { ...state, data, submitting: false, errors: [] }
    case failure(actions.API_FPL_TEAM_LIST_TRADES_INDEX):
    case failure(actions.API_LIST_POSITION_TRADES_CREATE):
      return { ...state, errors, submitting: false }
    default:
      return state
  }
}

export default reducer
