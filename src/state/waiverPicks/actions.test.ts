import { decamelizeKeys } from 'humps'

import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import history from 'state/history'
import {
  API_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAM_LISTS_PATH,
  API_LIST_POSITIONS_PATH
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

afterEach(() => {
  vi.restoreAllMocks()
})

const listPositionId = '9'
const fplTeamListId = '12'
const fplTeamId = '4'
const inPlayerId = '346'

const getState = () => ({
  fplTeamList: { outListPosition: { id: listPositionId } },
  fplTeam: { data: { id: fplTeamId } }
})

describe('Waiver picks actions', () => {
  describe('createWaiverPick', () => {
    it('dispatches the bare action, an apiRequest, and redirects on success', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.createWaiverPick(inPlayerId)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LIST_POSITION_WAIVER_PICKS_CREATE, inPlayerId })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'POST',
        url: `${API_URL}${API_LIST_POSITIONS_PATH}/${listPositionId}/waiver_picks`,
        body: { waiver_pick: decamelizeKeys({ inPlayerId }) },
        successAction: success(actions.API_LIST_POSITION_WAIVER_PICKS_CREATE),
        failureAction: failure(actions.API_LIST_POSITION_WAIVER_PICKS_CREATE)
      })
      expect(historyReplaceSpy).toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${fplTeamId}/waiverPicks`)
    })

    it('does not redirect if the request fails', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.createWaiverPick(inPlayerId)(dispatch, getState)

      expect(historyReplaceSpy).not.toHaveBeenCalled()
    })
  })

  describe('fetchWaiverPicks', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()

      actions.fetchWaiverPicks(fplTeamListId)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX, fplTeamListId })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/waiver_picks`,
        successAction: success(actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX),
        failureAction: failure(actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX)
      })
    })
  })

  describe('changeWaiverPickOrder', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()
      const waiverPickId = '3'
      const newPickNumber = '2'

      actions.changeWaiverPickOrder(fplTeamListId, waiverPickId, newPickNumber)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: actions.API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER, fplTeamListId, waiverPickId, newPickNumber
      })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'POST',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/waiver_picks/${waiverPickId}/change_order`,
        body: { waiver_pick: decamelizeKeys({ newPickNumber }) },
        successAction: success(actions.API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER),
        failureAction: failure(actions.API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER)
      })
    })
  })
})
