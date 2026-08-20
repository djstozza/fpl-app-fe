import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import { API_URL, ROUNDS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

describe('Rounds actions', () => {
  describe('fetchRounds', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()

      actions.fetchRounds()(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_ROUNDS_INDEX })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: false,
        method: 'GET',
        url: `${API_URL}${ROUNDS_URL}`,
        successAction: success(actions.API_ROUNDS_INDEX),
        failureAction: failure(actions.API_ROUNDS_INDEX)
      })
    })
  })
})
