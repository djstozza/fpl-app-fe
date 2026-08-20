import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import history from 'state/history'
import { stringify } from 'utilities/helpers'
import {
  API_URL,
  PROFILE_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAMS_PATH,
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

describe('Fpl teams actions', () => {
  describe('fetchFplTeams', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()
      const getState = vi.fn()

      actions.fetchFplTeams()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_FPL_TEAMS_INDEX })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAMS_PATH}`,
        successAction: success(actions.API_FPL_TEAMS_INDEX),
        failureAction: failure(actions.API_FPL_TEAMS_INDEX)
      })
    })
  })

  describe('updateFplTeamsSort', () => {
    it('dispatches the bare action and pushes the new sort into the URL', () => {
      const dispatch = vi.fn()
      const getState = vi.fn()
      const historyPushSpy = vi.spyOn(history, 'push')
      const sort = { name: 'desc' }

      actions.updateFplTeamsSort(sort)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_FPL_TEAMS_SORT, sort })
      expect(historyPushSpy).toHaveBeenCalledWith(`${PROFILE_URL}${FPL_TEAMS_URL}?${stringify({ sort })}`)
    })
  })
})
