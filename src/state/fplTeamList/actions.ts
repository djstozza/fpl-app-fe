import { stringify } from 'utilities/helpers'
import { apiRequest } from 'state/request/actions'

import {
  API_URL,
  API_FPL_TEAM_LISTS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

import type { ListPosition, InterTeamTradeGroup } from 'types'

export const API_FPL_TEAM_LISTS_SHOW = 'API_FPL_TEAM_LISTS_SHOW'
export const API_FPL_TEAM_LISTS_UPDATE = 'API_FPL_TEAM_LISTS_UPDATE'
export const API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX = 'API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX'
export const SET_OUT_LIST_POSITION = 'SET_OUT_LIST_POSITION'

export const fetchFplTeamList = (fplTeamListId: string) => (dispatch) => {
  dispatch({ type: API_FPL_TEAM_LISTS_SHOW, fplTeamListId })

  const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}`

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url,
    successAction: success(API_FPL_TEAM_LISTS_SHOW),
    failureAction: failure(API_FPL_TEAM_LISTS_SHOW)
  }))
}

export const fetchListPositions = (fplTeamListId: string, interTeamTradeGroup?: InterTeamTradeGroup) =>
  (dispatch) => {
    dispatch({ type: API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX, fplTeamListId, interTeamTradeGroup })

    const { trades = [] } = interTeamTradeGroup || {}
    const excludedPlayerIds: string[] = trades.map(({ outPlayer: { id } }) => id)

    const query = { filter: { excludedPlayerIds } }

    const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/list_positions?${stringify(query)}`

    return dispatch(apiRequest({
      needsAuth: true,
      method: 'GET',
      url,
      successAction: success(API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX),
      failureAction: failure(API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX)
    }))
  }

export const processSubstitution = (fplTeamListId: string, outListPositionId: string, inListPositionId: string) =>
  (dispatch) => {
    dispatch({ type: API_FPL_TEAM_LISTS_UPDATE, fplTeamListId, outListPositionId, inListPositionId })

    const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}`

    return dispatch(apiRequest({
      needsAuth: true,
      method: 'PUT',
      url,
      body: {
        fpl_team_list: {
          out_list_position_id: outListPositionId,
          in_list_position_id: inListPositionId
        }
      },
      successAction: success(API_FPL_TEAM_LISTS_UPDATE),
      failureAction: failure(API_FPL_TEAM_LISTS_UPDATE)
    }))
  }

export const setOutListPosition = (outListPosition?: ListPosition) => ({ type: SET_OUT_LIST_POSITION, outListPosition })
