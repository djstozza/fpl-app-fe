import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import { API_URL, ROUNDS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

describe('Round actions', () => {
  describe('fetchRound', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()
      const getState = vi.fn()
      const roundId = 1

      actions.fetchRound(roundId)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_ROUNDS_SHOW, roundId })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: false,
        method: 'GET',
        url: `${API_URL}${ROUNDS_URL}/${roundId}`,
        successAction: success(actions.API_ROUNDS_SHOW),
        failureAction: failure(actions.API_ROUNDS_SHOW)
      })
    })
  })
})
