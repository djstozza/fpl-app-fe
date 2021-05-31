import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Error } from 'types'

import type { League } from 'types'

export type State = {
  data: League[],
  submitting: boolean,
  errors: Error[]
}

export const initialState = {
  data: [],
  submitting: false,
  errors: []
}

const reducer = (state: State = initialState, action: Action) => {
  if (state === undefined) { state = initialState }
  const { data = [], errors } = action

  switch (action.type) {
    case actions.API_LEAGUES_CREATE:
      return { ...state, submitting: true }
    case success(actions.API_LEAGUES_INDEX):
    case success(actions.API_LEAGUES_CREATE):
      return { ...state, data, submitting: false }
    case failure(actions.API_LEAGUES_INDEX):
    case failure(actions.API_LEAGUES_CREATE):
      return { ...state, errors, submitting: false }
    default:
      return state
  }
}

export default reducer
