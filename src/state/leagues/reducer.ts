import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Error } from 'types'

import type { League } from 'types'

export type State = {
  data: League[],
  submitting: boolean,
  errors: Error[]
}

export const initialFilterState = {
  page: { offset: 0, limit: 50 },
  sort: {
    name: 'asc'
  }
}

export const initialState = {
  data: [],
  submitting: false,
  errors: []
}

const reducer = (state: State = initialState, action: Action) => {
  const { data = [], errors } = action

  switch (action.type) {
    case actions.INITIALIZE_FORM:
      return { ...initialState }
    case actions.API_LEAGUES_CREATE:
    case actions.API_LEAGUES_JOIN:
      return { ...state, submitting: true }
    case success(actions.API_LEAGUES_INDEX):
    case success(actions.API_LEAGUES_CREATE):
    case success(actions.API_LEAGUES_JOIN):
      return { ...state, data, submitting: false }
    case failure(actions.API_LEAGUES_INDEX):
    case failure(actions.API_LEAGUES_CREATE):
    case failure(actions.API_LEAGUES_JOIN):
      return { ...state, errors, submitting: false }
    default:
      return state
  }
}

export default reducer
