import qs from 'qs'

import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import { stringify } from 'utilities/helpers'
import history from 'state/history'
import { API_URL, PLAYERS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

afterEach(() => {
  vi.restoreAllMocks()
})

const sort = { lastName: 'desc' }
const filter = { team_id: ['1'] }
const page = { offset: '1', limit: '50' }

describe('Players actions', () => {
  describe('fetchPlayers', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()

      actions.fetchPlayers({ sort, filter, page })(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_PLAYERS_INDEX, sort, filter, page })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: false,
        method: 'GET',
        url: `${API_URL}${PLAYERS_URL}?${stringify({ sort, filter, page })}`,
        successAction: success(actions.API_PLAYERS_INDEX),
        failureAction: failure(actions.API_PLAYERS_INDEX)
      })
    })

    it('defaults sort, filter, and page when not provided', () => {
      const dispatch = vi.fn()

      actions.fetchPlayers({})(dispatch)

      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: false,
        method: 'GET',
        url: `${API_URL}${PLAYERS_URL}?${stringify({ sort: {}, filter: {}, page: {} })}`,
        successAction: success(actions.API_PLAYERS_INDEX),
        failureAction: failure(actions.API_PLAYERS_INDEX)
      })
    })
  })

  describe('fetchFacets', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()

      actions.fetchFacets()(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_PLAYERS_FACETS_INDEX })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: false,
        method: 'GET',
        url: `${API_URL}${PLAYERS_URL}/facets`,
        successAction: success(actions.API_PLAYERS_FACETS_INDEX),
        failureAction: failure(actions.API_PLAYERS_FACETS_INDEX)
      })
    })
  })

  describe('updateFilter', () => {
    it('dispatches the bare action and pushes the new query into the URL', () => {
      const dispatch = vi.fn()
      const getState = vi.fn().mockReturnValue({ players: { sort, page } })
      const historyPushSpy = vi.spyOn(history, 'push')

      actions.updateFilter(filter)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_PLAYERS_FILTER, filter })
      expect(historyPushSpy).toHaveBeenCalledWith(
        `${PLAYERS_URL}?${qs.stringify({ filter, sort, page: { ...page, offset: 0 } })}`
      )
    })
  })

  describe('updateSort', () => {
    it('dispatches the bare action and pushes the new query into the URL', () => {
      const dispatch = vi.fn()
      const getState = vi.fn().mockReturnValue({ players: { filter, page } })
      const historyPushSpy = vi.spyOn(history, 'push')

      actions.updateSort(sort)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_PLAYERS_SORT, sort })
      expect(historyPushSpy).toHaveBeenCalledWith(`${PLAYERS_URL}?${qs.stringify({ filter, sort, page })}`)
    })
  })

  describe('updatePage', () => {
    it('dispatches the bare action and pushes the new query into the URL', () => {
      const dispatch = vi.fn()
      const getState = vi.fn().mockReturnValue({ players: { filter, sort, page } })
      const historyPushSpy = vi.spyOn(history, 'push')

      actions.updatePage(page.offset)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_PLAYERS_PAGE, offset: page.offset })
      expect(historyPushSpy).toHaveBeenCalledWith(
        `${PLAYERS_URL}?${qs.stringify({ filter, sort, page: { ...page, offset: page.offset } })}`
      )
    })
  })
})
