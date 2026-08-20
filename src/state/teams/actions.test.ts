import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import { API_URL, TEAMS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import history from 'state/history'
import qs from 'qs'
import { decamelizeKeys } from 'humps'

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

const sort = { name: 'asc' }

describe('Teams actions', () => {
  describe('fetchTeams', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()
      const getState = vi.fn()

      actions.fetchTeams({ sort })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_TEAMS_INDEX, sort })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: false,
        method: 'GET',
        url: `${API_URL}${TEAMS_URL}?${qs.stringify(decamelizeKeys({ sort }))}`,
        successAction: success(actions.API_TEAMS_INDEX),
        failureAction: failure(actions.API_TEAMS_INDEX)
      })
    })
  })

  describe('updateSort', () => {
    it('dispatches the bare action and pushes the new sort into the URL', () => {
      const dispatch = vi.fn()
      const getState = vi.fn()
      const historyPushSpy = vi.spyOn(history, 'push')

      actions.updateSort(sort)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_TEAMS_SORT, sort })
      expect(historyPushSpy).toHaveBeenCalledWith(`${TEAMS_URL}?${qs.stringify({ sort })}`)
    })
  })
})
