import { apiRequest } from 'state/request/actions'

import {
  API_URL,
  API_FPL_TEAM_LISTS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

export const API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP = 'API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP'

export const fetchInterTeamTradeGroup = (fplTeamListId: string, interTeamTradeGroupId: string) =>
  (dispatch) => {
    dispatch({ type: API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP, fplTeamListId, interTeamTradeGroupId })

    const url = `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups/${interTeamTradeGroupId}`

    return dispatch(apiRequest({
      needsAuth: true,
      method: 'GET',
      url,
      successAction: success(API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP),
      failureAction: failure(API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP)
    }))
  }
