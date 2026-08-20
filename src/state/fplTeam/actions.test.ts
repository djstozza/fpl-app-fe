import { decamelizeKeys } from 'humps'

import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import history from 'state/history'
import {
  API_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAMS_PATH,
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import { FPL_TEAM_1 } from 'test/fixtures'

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Fpl team actions', () => {
  describe('fetchFplTeam', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()
      const fplTeamId = '1'

      actions.fetchFplTeam(fplTeamId)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_FPL_TEAMS_SHOW, fplTeamId })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAMS_PATH}/${fplTeamId}`,
        successAction: success(actions.API_FPL_TEAMS_SHOW),
        failureAction: failure(actions.API_FPL_TEAMS_SHOW)
      })
    })
  })

  describe('updateFplTeam', () => {
    const fplTeam = { name: 'Fpl team 1' }

    it('dispatches the bare action and an apiRequest, and redirects on success', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)
      const getState = vi.fn().mockReturnValue({ fplTeam: { data: FPL_TEAM_1 } })
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.updateFplTeam({ fplTeam })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_FPL_TEAMS_UPDATE, fplTeam })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'PUT',
        url: `${API_URL}${API_FPL_TEAMS_PATH}/${FPL_TEAM_1.id}`,
        body: { fpl_team: decamelizeKeys(fplTeam) },
        successAction: success(actions.API_FPL_TEAMS_UPDATE),
        failureAction: failure(actions.API_FPL_TEAMS_UPDATE)
      })
      expect(historyReplaceSpy).toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${FPL_TEAM_1.id}`)
    })

    it('does not redirect if the request fails', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)
      const getState = vi.fn().mockReturnValue({ fplTeam: { data: FPL_TEAM_1 } })
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.updateFplTeam({ fplTeam })(dispatch, getState)

      expect(historyReplaceSpy).not.toHaveBeenCalled()
    })
  })
})
