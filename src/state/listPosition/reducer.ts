import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Error } from 'types'

export type State = {
  validSubstitutions: string[],
  fetching: boolean,
  errors: Error[]
}

export const initialState = {
  validSubstitutions: [],
  fetching: false,
  errors: []
}

const reducer = (state: State = initialState, action: Action) => {
  if (state === undefined) { state = initialState }
  const { data: { validSubstitutions = [] } = {}, errors } = action

  switch (action.type) {
    case success(actions.API_LIST_POSITION_SHOW):
      return { ...state, validSubstitutions, fetching: false }
    case actions.API_LIST_POSITION_SHOW:
      return { ...state, fetching: true }
    case failure(actions.API_LIST_POSITION_SHOW):
      return { ...state, errors, fetching: false }
    case actions.CLEAR_VALID_SUBSTITUTIONS:
      return { ...state, validSubstitutions: [] }
    default:
      return state
  }
}

export default reducer
