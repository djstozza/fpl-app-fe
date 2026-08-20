import { decamelizeKeys } from 'humps'
import qs from 'qs'
import { stringify } from 'utilities/helpers'

import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import { fetchPlayers } from 'state/players/actions'
import { setOutListPosition } from 'state/fplTeamList/actions'
import history from 'state/history'

import { API_URL, LEAGUES_URL, API_FPL_TEAM_LISTS_PATH } from 'utilities/constants'
import { success, failure } from 'utilities/actions'

import { LIVE_LEAGUE, LIST_POSITION_1 } from 'test/fixtures'

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

vi.mock('state/players/actions', async () => ({
  ...(await vi.importActual('state/players/actions')),
  fetchPlayers: vi.fn()
}))

vi.mock('state/fplTeamList/actions', async () => ({
  ...(await vi.importActual('state/fplTeamList/actions')),
  setOutListPosition: vi.fn()
}))

afterEach(() => {
  vi.restoreAllMocks()
  vi.clearAllMocks()
})

const { id } = LIVE_LEAGUE
const season = 'winder'
const sort = { lastName: 'desc' }
const filter = { team_id: ['3'] }
const page = { offset: '51', limit: '50' }
const fplTeamListId = '12'
const inPlayerId = '352'
const { id: listPositionId, position: { id: positionId } } = LIST_POSITION_1

describe('Mini draft picks actions', () => {
  describe('fetchMiniDraftPicks', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()
      const getState = () => ({ league: { data: LIVE_LEAGUE }, miniDraftPicks: { season } })

      actions.fetchMiniDraftPicks({ sort, filter })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX, sort, filter })

      const query = { mini_draft_pick: { season }, sort, filter }
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${id}/mini_draft_picks?${stringify(query)}`,
        successAction: success(actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX),
        failureAction: failure(actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX)
      })
    })
  })

  describe('fetchMiniDraftPicksStatus', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()

      actions.fetchMiniDraftPicksStatus(id)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX, leagueId: id })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${id}/mini_draft_picks/status`,
        successAction: success(actions.API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX),
        failureAction: failure(actions.API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX)
      })
    })
  })

  describe('fetchMiniDraftPickFacets', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()
      const getState = () => ({ league: { data: LIVE_LEAGUE }, miniDraftPicks: { season } })

      actions.fetchMiniDraftPickFacets()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${id}/mini_draft_picks/facets?${stringify({ mini_draft_pick: { season } })}`,
        successAction: success(actions.API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX),
        failureAction: failure(actions.API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX)
      })
    })
  })

  describe('updateFilter', () => {
    it('dispatches the bare action and pushes the new filter into the URL', () => {
      const dispatch = vi.fn()
      const historyPushSpy = vi.spyOn(history, 'push')
      const getState = () => ({ league: { data: LIVE_LEAGUE }, miniDraftPicks: { sort } })

      actions.updateFilter(filter)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_MINI_DRAFT_PICKS_FILTER, filter })

      const query = { filter, sort }
      expect(historyPushSpy).toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/miniDraft/miniDraftPicks?${qs.stringify(query)}`)
    })
  })

  describe('updateSort', () => {
    it('dispatches the bare action and pushes the new sort into the URL', () => {
      const dispatch = vi.fn()
      const historyPushSpy = vi.spyOn(history, 'push')
      const getState = () => ({ league: { data: LIVE_LEAGUE }, miniDraftPicks: { filter } })

      actions.updateSort(sort)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_MINI_DRAFT_PICKS_SORT, sort })

      const query = { filter, sort }
      expect(historyPushSpy).toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/miniDraft/miniDraftPicks?${qs.stringify(query)}`)
    })
  })

  describe('createMiniDraftPick', () => {
    const getState = () => ({
      miniDraftPicks: { fplTeamListId },
      fplTeamList: { outListPosition: LIST_POSITION_1 },
      league: { data: LIVE_LEAGUE }
    })

    it('dispatches the bare action, an apiRequest, and runs the success side effects', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.createMiniDraftPick(inPlayerId)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE, inPlayerId })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'POST',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/list_positions/${listPositionId}/mini_draft_picks`,
        body: { mini_draft_pick: decamelizeKeys({ inPlayerId }) },
        successAction: success(actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE),
        failureAction: failure(actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE)
      })
      expect(dispatch).toHaveBeenCalledWith(expect.any(Function))
      expect(historyReplaceSpy).toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/miniDraft`)
      expect(setOutListPosition).toHaveBeenCalledWith(undefined)
    })

    it('does not run the success side effects if the request fails', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.createMiniDraftPick(inPlayerId)(dispatch, getState)

      expect(historyReplaceSpy).not.toHaveBeenCalled()
      expect(setOutListPosition).not.toHaveBeenCalled()
    })
  })

  describe('passMiniDraftPick', () => {
    const getState = () => ({
      miniDraftPicks: { fplTeamListId },
      fplTeamList: { outListPosition: LIST_POSITION_1 },
      league: { data: LIVE_LEAGUE }
    })

    it('dispatches the bare action, an apiRequest, and runs the success side effects', async () => {
      const dispatch = vi.fn().mockResolvedValue(true)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.passMiniDraftPick()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LEAGUE_MINI_DRAFT_PICK_PASS })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'POST',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/mini_draft_picks`,
        body: { mini_draft_pick: decamelizeKeys({ passed: true }) },
        successAction: success(actions.API_LEAGUE_MINI_DRAFT_PICK_PASS),
        failureAction: failure(actions.API_LEAGUE_MINI_DRAFT_PICK_PASS)
      })
      expect(historyReplaceSpy).toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/miniDraft`)
      expect(setOutListPosition).toHaveBeenCalledWith(undefined)
    })

    it('does not run the success side effects if the request fails', async () => {
      const dispatch = vi.fn().mockResolvedValue(false)
      const historyReplaceSpy = vi.spyOn(history, 'replace')

      await actions.passMiniDraftPick()(dispatch, getState)

      expect(historyReplaceSpy).not.toHaveBeenCalled()
      expect(setOutListPosition).not.toHaveBeenCalled()
    })
  })

  describe('fetchTradeablePlayers', () => {
    it('dispatches the bare action and fetches players scoped to league and position', () => {
      const dispatch = vi.fn()
      const getState = () => ({
        league: { data: LIVE_LEAGUE },
        fplTeamList: { outListPosition: LIST_POSITION_1 }
      })

      actions.fetchTradeablePlayers({ sort, filter, page })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.MINI_DRAFT_FETCH_TRADEABLE_PLAYERS, sort, filter, page })
      expect(fetchPlayers).toHaveBeenCalledWith({ filter: { ...filter, leagueId: id, positionId }, sort, page })
    })
  })

  describe('updateTradeablePlayersSort', () => {
    it('dispatches the bare action and replaces the URL', () => {
      const dispatch = vi.fn()
      const historyReplaceSpy = vi.spyOn(history, 'replace')
      const getState = () => ({
        league: { data: LIVE_LEAGUE },
        fplTeamList: { outListPosition: LIST_POSITION_1 },
        players: { filter, page }
      })

      actions.updateTradeablePlayersSort(sort)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_SORT, sort })

      const query = { filter: { ...filter, leagueId: id, positionId }, sort, page }
      expect(historyReplaceSpy)
        .toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/miniDraft/tradeableListPositions?${qs.stringify(query)}`)
    })
  })

  describe('updateTradeablePlayersFilter', () => {
    it('dispatches the bare action and replaces the URL', () => {
      const dispatch = vi.fn()
      const historyReplaceSpy = vi.spyOn(history, 'replace')
      const getState = () => ({
        league: { data: LIVE_LEAGUE },
        fplTeamList: { outListPosition: LIST_POSITION_1 },
        players: { sort, page }
      })

      actions.updateTradeablePlayersFilter(filter)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_FILTER, filter })

      const query = { filter: { ...filter, leagueId: id, positionId }, sort, page: { ...page, offset: 0 } }
      expect(historyReplaceSpy)
        .toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/miniDraft/tradeableListPositions?${qs.stringify(query)}`)
    })
  })

  describe('updateTradeablePlayersPage', () => {
    it('dispatches the bare action and replaces the URL', () => {
      const dispatch = vi.fn()
      const historyReplaceSpy = vi.spyOn(history, 'replace')
      const getState = () => ({
        league: { data: LIVE_LEAGUE },
        fplTeamList: { outListPosition: LIST_POSITION_1 },
        players: { sort, page: { offset: 100, limit: 50 }, filter }
      })

      actions.updateTradeablePlayersPage(page.offset)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_PAGE, offset: page.offset })

      const query = { filter: { ...filter, leagueId: id, positionId }, sort, page: { ...page, offset: page.offset } }
      expect(historyReplaceSpy)
        .toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/miniDraft/tradeableListPositions?$${qs.stringify(query)}`)
    })
  })
})
