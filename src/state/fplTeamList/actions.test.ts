import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import { stringify } from 'utilities/helpers'
import { API_URL, API_FPL_TEAM_LISTS_PATH } from 'utilities/constants'
import { success, failure } from 'utilities/actions'

import { INTER_TEAM_TRADE_GROUP_1, LIST_POSITION_1 } from 'test/fixtures'

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

const fplTeamListId = '1'

describe('Fpl team list actions', () => {
  describe('fetchFplTeamList', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()

      actions.fetchFplTeamList(fplTeamListId)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_FPL_TEAM_LISTS_SHOW, fplTeamListId })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}`,
        successAction: success(actions.API_FPL_TEAM_LISTS_SHOW),
        failureAction: failure(actions.API_FPL_TEAM_LISTS_SHOW)
      })
    })
  })

  describe('fetchListPositions', () => {
    it('dispatches the bare action and an apiRequest excluding no players when there is no trade group', () => {
      const dispatch = vi.fn()

      actions.fetchListPositions(fplTeamListId)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX, fplTeamListId, interTeamTradeGroup: undefined
      })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/list_positions?`
          + `${stringify({ filter: { excludedPlayerIds: [] } })}`,
        successAction: success(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX),
        failureAction: failure(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX)
      })
    })

    it('excludes the out players of an existing trade group', () => {
      const dispatch = vi.fn()
      const interTeamTradeGroup = INTER_TEAM_TRADE_GROUP_1
      const excludedPlayerIds = interTeamTradeGroup.trades.map(({ outPlayer: { id } }) => id)

      actions.fetchListPositions(fplTeamListId, interTeamTradeGroup)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX, fplTeamListId, interTeamTradeGroup
      })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/list_positions?`
          + `${stringify({ filter: { excludedPlayerIds } })}`,
        successAction: success(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX),
        failureAction: failure(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX)
      })
    })
  })

  describe('processSubstitution', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()
      const outListPositionId = '2'
      const inListPositionId = '5'

      actions.processSubstitution(fplTeamListId, outListPositionId, inListPositionId)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: actions.API_FPL_TEAM_LISTS_UPDATE, fplTeamListId, outListPositionId, inListPositionId
      })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'PUT',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}`,
        body: {
          fpl_team_list: {
            out_list_position_id: outListPositionId,
            in_list_position_id: inListPositionId
          }
        },
        successAction: success(actions.API_FPL_TEAM_LISTS_UPDATE),
        failureAction: failure(actions.API_FPL_TEAM_LISTS_UPDATE)
      })
    })
  })

  describe('setOutListPosition', () => {
    it('returns the bare action', () => {
      const outListPosition = LIST_POSITION_1

      expect(actions.setOutListPosition(outListPosition))
        .toEqual({ type: actions.SET_OUT_LIST_POSITION, outListPosition })
    })
  })
})
