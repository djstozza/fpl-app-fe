import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import { stringify } from 'utilities/helpers'
import { API_URL, API_FPL_TEAM_LISTS_PATH } from 'utilities/constants'
import { success, failure } from 'utilities/actions'

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

describe('Fpl team lists actions', () => {
  describe('fetchFplTeamLists', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()
      const fplTeamId = '1'

      actions.fetchFplTeamLists(fplTeamId)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_FPL_TEAM_LISTS_INDEX, fplTeamId })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}?${stringify({ fplTeamList: { fplTeamId } })}`,
        successAction: success(actions.API_FPL_TEAM_LISTS_INDEX),
        failureAction: failure(actions.API_FPL_TEAM_LISTS_INDEX)
      })
    })
  })
})
