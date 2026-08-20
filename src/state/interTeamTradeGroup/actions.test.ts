import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import { API_URL, API_FPL_TEAM_LISTS_PATH } from 'utilities/constants'
import { success, failure } from 'utilities/actions'

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

describe('Inter team trade group actions', () => {
  describe('fetchInterTeamTradeGroup', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()
      const getState = vi.fn()
      const fplTeamListId = '1'
      const interTeamTradeGroupId = '4'

      actions.fetchInterTeamTradeGroup(fplTeamListId, interTeamTradeGroupId)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP, fplTeamListId, interTeamTradeGroupId
      })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/inter_team_trade_groups/${interTeamTradeGroupId}`,
        successAction: success(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP),
        failureAction: failure(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP)
      })
    })
  })
})
