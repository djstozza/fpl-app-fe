import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Player, History, Sort } from 'types'

export type State = {
  data?: Player,
  playerHistory?: History[]
  sort: Sort
}

type PlayerAction = {
  sort: Sort
} & Action

export const initialFilterState = {
  sort: {
    kickoffTime: 'asc'
  }
}

export const initialState = {
  errors: [],
  ...initialFilterState
}

const reducer = (state: any = initialState, action: PlayerAction) => {
  if (state === undefined) { state = initialState }
  const { data, sort } = action
  switch (action.type) {
    case success(actions.API_PLAYERS_SHOW):
      if (data) return { ...state, data }

      return state
    case success(actions.API_PLAYERS_HISTORY_INDEX):
      const { data: history } = action
      return { ...state, history }
    case failure(actions.API_PLAYERS_SHOW):
    case failure(actions.API_PLAYERS_HISTORY_INDEX):
      const { errors } = action

      return { ...state, errors }
    default:
      return state
  }
}

export default reducer
