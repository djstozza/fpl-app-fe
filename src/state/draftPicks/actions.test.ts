import { decamelizeKeys } from 'humps'
import qs from 'qs'
import { stringify } from 'utilities/helpers'

import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import history from 'state/history'

import { API_URL, LEAGUES_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'

import { LIVE_LEAGUE } from 'test/fixtures'

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

afterEach(() => {
  vi.restoreAllMocks()
  vi.clearAllMocks()
})

const sort = { pickNumber: 'asc' }
const filter = { team_id: ['1'] }
const { id } = LIVE_LEAGUE
const nextDraftPickId = '4'
const playerId = '351'
const leagueId = '1'

const getState = () => ({ league: { data: LIVE_LEAGUE }, draftPicks: { sort, filter } })

describe('DraftPicks actions', () => {
  describe('fetchDraftPicks', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()

      actions.fetchDraftPicks({ sort })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LEAGUE_DRAFT_PICKS_INDEX, sort, filter: undefined })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${id}/draft_picks?${stringify({ sort, filter: {} })}`,
        successAction: success(actions.API_LEAGUE_DRAFT_PICKS_INDEX),
        failureAction: failure(actions.API_LEAGUE_DRAFT_PICKS_INDEX)
      })

      actions.fetchDraftPicks({ sort, filter })(dispatch, getState)

      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${id}/draft_picks?${stringify({ sort, filter })}`,
        successAction: success(actions.API_LEAGUE_DRAFT_PICKS_INDEX),
        failureAction: failure(actions.API_LEAGUE_DRAFT_PICKS_INDEX)
      })
    })
  })

  describe('fetchDraftPickFacets', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()

      actions.fetchDraftPickFacets()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${id}/draft_picks/facets`,
        successAction: success(actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX),
        failureAction: failure(actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX)
      })
    })
  })

  describe('updateFilter', () => {
    it('dispatches the bare action and pushes the new filter into the URL', () => {
      const dispatch = vi.fn()
      const historyPushSpy = vi.spyOn(history, 'push')

      actions.updateFilter(filter)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_DRAFT_PICKS_FILTER, filter })
      expect(historyPushSpy)
        .toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/draft/draftPicks?${qs.stringify({ filter, sort })}`)
    })
  })

  describe('updateSort', () => {
    it('dispatches the bare action and pushes the new sort into the URL', () => {
      const dispatch = vi.fn()
      const historyPushSpy = vi.spyOn(history, 'push')

      actions.updateSort(sort)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_DRAFT_PICKS_SORT, sort })
      expect(historyPushSpy)
        .toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/draft/draftPicks?${qs.stringify({ filter, sort })}`)
    })
  })

  describe('fetchDraftPicksStatus', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()

      actions.fetchDraftPicksStatus(leagueId)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LEAGUE_DRAFT_PICKS_STATUS_INDEX, leagueId })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${leagueId}/draft_picks/status`,
        successAction: success(actions.API_LEAGUE_DRAFT_PICKS_STATUS_INDEX),
        failureAction: failure(actions.API_LEAGUE_DRAFT_PICKS_STATUS_INDEX)
      })
    })
  })

  describe('updateDraftPick', () => {
    it('dispatches the bare action and an apiRequest', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)

      await actions.updateDraftPick({ playerId, nextDraftPickId })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actions.API_LEAGUE_DRAFT_PICK_UPDATE, playerId, miniDraft: undefined, nextDraftPickId
      })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'PUT',
        url: `${API_URL}${LEAGUES_URL}/${id}/draft_picks/${nextDraftPickId}?${stringify({ sort, filter })}`,
        body: { league: decamelizeKeys({ playerId, miniDraft: undefined }) },
        successAction: success(actions.API_LEAGUE_DRAFT_PICK_UPDATE),
        failureAction: failure(actions.API_LEAGUE_DRAFT_PICK_UPDATE)
      })

      await actions.updateDraftPick({ miniDraft: true, nextDraftPickId })(dispatch, getState)

      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'PUT',
        url: `${API_URL}${LEAGUES_URL}/${id}/draft_picks/${nextDraftPickId}?${stringify({ sort, filter })}`,
        body: { league: decamelizeKeys({ playerId: undefined, miniDraft: true }) },
        successAction: success(actions.API_LEAGUE_DRAFT_PICK_UPDATE),
        failureAction: failure(actions.API_LEAGUE_DRAFT_PICK_UPDATE)
      })
    })

    it('refetches draft pick status and redirects to the draft on success', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.updateDraftPick({ playerId, nextDraftPickId })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith(expect.any(Function))
      expect(historyReplaceSpy).toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/draft`)
    })

    it('does not refetch or redirect if the request fails', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.updateDraftPick({ playerId, nextDraftPickId })(dispatch, getState)

      expect(historyReplaceSpy).not.toHaveBeenCalled()
    })
  })
})
