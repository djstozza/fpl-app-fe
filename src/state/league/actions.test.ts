import { decamelizeKeys } from 'humps'
import qs from 'qs'

import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import { fetchPlayers } from 'state/players/actions'
import history from 'state/history'
import { stringify } from 'utilities/helpers'
import { API_URL, LEAGUES_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'

import { LIVE_LEAGUE } from 'test/fixtures'

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

vi.mock('state/players/actions', async () => ({
  ...(await vi.importActual('state/players/actions')),
  fetchPlayers: vi.fn()
}))

afterEach(() => {
  vi.restoreAllMocks()
  vi.clearAllMocks()
})

const { id: leagueId } = LIVE_LEAGUE
const league = { name: 'League 1', code: '1234' }
const sort = { name: 'desc' }
const filter = { position_id: ['4'] }
const page = { offset: '1', limit: '50' }

const getState = () => ({ league: { data: LIVE_LEAGUE }, players: { filter, sort, page } })

describe('League actions', () => {
  describe('fetchLeague', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()

      actions.fetchLeague(leagueId)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LEAGUES_SHOW, leagueId })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${leagueId}`,
        successAction: success(actions.API_LEAGUES_SHOW),
        failureAction: failure(actions.API_LEAGUES_SHOW)
      })
    })
  })

  describe('updateLeague', () => {
    it('dispatches the bare action, an apiRequest, and redirects on success', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.updateLeague({ league })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LEAGUES_UPDATE, league })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'PUT',
        url: `${API_URL}${LEAGUES_URL}/${leagueId}`,
        body: { league: decamelizeKeys(league) },
        successAction: success(actions.API_LEAGUES_UPDATE),
        failureAction: failure(actions.API_LEAGUES_UPDATE)
      })
      expect(historyReplaceSpy).toHaveBeenCalledWith(`${LEAGUES_URL}/${leagueId}`)
    })

    it('does not redirect if the request fails', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.updateLeague({ league })(dispatch, getState)

      expect(historyReplaceSpy).not.toHaveBeenCalled()
    })
  })

  describe('fetchFplTeams', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()

      actions.fetchFplTeams({ sort })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LEAGUE_FPL_TEAMS_INDEX, sort })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${leagueId}/fpl_teams?${stringify({ sort })}`,
        successAction: success(actions.API_LEAGUE_FPL_TEAMS_INDEX),
        failureAction: failure(actions.API_LEAGUE_FPL_TEAMS_INDEX)
      })
    })
  })

  describe('updateFplTeamsSort', () => {
    it('dispatches the bare action and pushes the new sort into the URL', () => {
      const dispatch = vi.fn()
      const historyPushSpy = vi.spyOn(history, 'push')

      actions.updateFplTeamsSort({ sort })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_LEAGUE_FPL_TEAMS_SORT, sort })
      expect(historyPushSpy).toHaveBeenCalledWith(`${LEAGUES_URL}/${leagueId}/fplTeams?${qs.stringify({ sort })}`)
    })
  })

  describe('generateDraftPicks', () => {
    it('dispatches the bare action, an apiRequest, and refetches the league on success', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.generateDraftPicks(leagueId)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LEAGUE_GENERATE_DRAFT_PICKS, leagueId })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'POST',
        url: `${API_URL}${LEAGUES_URL}/${leagueId}/generate_draft_picks`,
        successAction: success(actions.API_LEAGUE_GENERATE_DRAFT_PICKS),
        failureAction: failure(actions.API_LEAGUE_GENERATE_DRAFT_PICKS)
      })

      const sort = { draft_pick_number: 'asc' }
      expect(historyReplaceSpy).toHaveBeenCalledWith(`${LEAGUES_URL}/${leagueId}/fplTeams?${stringify({ sort })}`)
      expect(dispatch).toHaveBeenCalledWith(expect.any(Function))
    })

    it('does not refetch or redirect if the request fails', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.generateDraftPicks(leagueId)(dispatch, getState)

      expect(historyReplaceSpy).not.toHaveBeenCalled()
    })
  })

  describe('createDraft', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()

      actions.createDraft(leagueId)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LEAGUE_CREATE_DRAFT, leagueId })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'POST',
        url: `${API_URL}${LEAGUES_URL}/${leagueId}/create_draft`,
        successAction: success(actions.API_LEAGUE_CREATE_DRAFT),
        failureAction: failure(actions.API_LEAGUE_CREATE_DRAFT)
      })
    })
  })

  describe('fetchAvailablePlayers', () => {
    it('dispatches the bare action and fetches players scoped to the league', () => {
      const dispatch = vi.fn()

      actions.fetchAvailablePlayers({ sort, filter, page })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.FETCH_AVAILABLE_PLAYERS, sort, filter, page })
      expect(fetchPlayers).toHaveBeenCalledWith({ filter: { ...filter, leagueId }, sort, page })
    })
  })

  describe('updateAvailablePlayersSort', () => {
    it('dispatches the bare action and pushes the new sort into the URL', () => {
      const dispatch = vi.fn()
      const historyPushSpy = vi.spyOn(history, 'push')

      actions.updateAvailablePlayersSort(sort)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_AVAILABLE_PLAYERS_SORT, sort })
      expect(historyPushSpy)
        .toHaveBeenCalledWith(`${LEAGUES_URL}/${leagueId}/draft/availablePlayers?${qs.stringify({ filter, sort, page })}`)
    })
  })

  describe('updateAvailablePlayersFilter', () => {
    it('dispatches the bare action and pushes the new filter into the URL', () => {
      const dispatch = vi.fn()
      const historyPushSpy = vi.spyOn(history, 'push')

      actions.updateAvailablePlayersFilter(filter)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_AVAILABLE_PLAYERS_FILTER, filter })

      const query = { filter, sort, page: { ...page, offset: 0 } }
      expect(historyPushSpy).toHaveBeenCalledWith(`${LEAGUES_URL}/${leagueId}/draft/availablePlayers?${qs.stringify(query)}`)
    })
  })

  describe('updateAvailablePlayersPage', () => {
    it('dispatches the bare action and pushes the new page into the URL', () => {
      const dispatch = vi.fn()
      const historyPushSpy = vi.spyOn(history, 'push')

      actions.updateAvailablePlayersPage(page.offset)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_AVAILABLE_PLAYERS_PAGE, offset: page.offset })

      const query = { filter, sort, page: { ...page, offset: page.offset } }
      expect(historyPushSpy).toHaveBeenCalledWith(`${LEAGUES_URL}/${leagueId}/draft/availablePlayers?${qs.stringify(query)}`)
    })
  })

  describe('initializeForm', () => {
    it('returns the bare action', () => {
      expect(actions.initializeForm()).toEqual({ type: actions.INITIALIZE_FORM })
    })
  })
})
