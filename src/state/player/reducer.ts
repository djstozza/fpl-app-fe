import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Action, Player, History, HistoryPast, Sort } from 'types'

export type State = {
  data?: Player,
  history?: History[],
  historyPast?: HistoryPast[],
  sort: Sort,
  fetching: boolean
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
  fetching: false,
  ...initialFilterState
}

const reducer = (state: any = initialState, action: PlayerAction) => {
  const { data, sort } = action
  switch (action.type) {
    case success(actions.API_PLAYERS_SHOW):
      if (data) return { ...state, data }

      return state
    case actions.API_PLAYERS_HISTORY_INDEX:
    case actions.API_PLAYERS_HISTORY_PAST_INDEX:
      return { ...state, fetching: true }
    case success(actions.API_PLAYERS_HISTORY_INDEX):
      const { data: history } = action

      return { ...state, history, fetching: false }
    case success(actions.API_PLAYERS_HISTORY_PAST_INDEX):
      const { data: historyPast } = action

      return { ...state, historyPast, fetching: false }
    case actions.UPDATE_PLAYER_HISTORY_SORT:
      return { ...state, sort: { ...state.sort, history: sort } }
    case actions.UPDATE_PLAYER_HISTORY_PAST_SORT:
      return { ...state, sort: { ...state.sort, historyPast: sort } }
    case failure(actions.API_PLAYERS_SHOW):
    case failure(actions.API_PLAYERS_HISTORY_INDEX):
    case failure(actions.API_PLAYERS_HISTORY_PAST_INDEX):
      const { errors } = action

      return { ...state, errors, fetching: false }
    default:
      return state
  }
}

export default reducer
