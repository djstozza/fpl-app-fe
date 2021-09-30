import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Player, History, HistoryPast, Sort } from 'types'

export type State = {
  data?: Player,
  history?: History[],
  historyPast?: HistoryPast[],
  sort: Sort
}

type PlayerAction = {
  sort: Sort
} & Action

export const initialFilterState = {
  sort: {
    history: {
      kickoffTime: 'asc'
    },
    historyPast: {
      seasonName: 'desc'
    }
  }
}

export const initialState = {
  errors: [],
  ...initialFilterState
}

const reducer = (state: any = initialState, action: PlayerAction) => {
  const { data, sort } = action
  switch (action.type) {
    case success(actions.API_PLAYERS_SHOW):
      if (data) return { ...state, data }

      return state
    case success(actions.API_PLAYERS_HISTORY_INDEX):
      const { data: history } = action

      return { ...state, history }
    case success(actions.API_PLAYERS_HISTORY_PAST_INDEX):
      const { data: historyPast } = action

      return { ...state, historyPast }
    case actions.UPDATE_PLAYER_HISTORY:
      return { ...state, sort: { ...state.sort, history: sort } }
    case actions.UPDATE_PLAYER_HISTORY_PAST:
      return { ...state, sort: { ...state.sort, historyPast: sort } }
    case failure(actions.API_PLAYERS_SHOW):
    case failure(actions.API_PLAYERS_HISTORY_INDEX):
    case failure(actions.API_PLAYERS_HISTORY_PAST_INDEX):
      const { errors } = action

      return { ...state, errors }
    default:
      return state
  }
}

export default reducer
