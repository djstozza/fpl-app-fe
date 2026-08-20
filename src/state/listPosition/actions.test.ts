import qs from 'qs'
import { stringify } from 'utilities/helpers'

import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import { fetchPlayers } from 'state/players/actions'
import history from 'state/history'

import {
  API_URL,
  FPL_TEAMS_URL,
  API_LIST_POSITIONS_PATH,
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

import { FPL_TEAM_1, LIST_POSITION_1 } from 'test/fixtures'

import type { Filter, Sort } from 'types'

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

const listPositionId = '23'
const { id, league: { id: leagueId } } = FPL_TEAM_1
const { id: outListPositionId, position: { id: positionId } } = LIST_POSITION_1
const sort = { name: 'desc' }
const filter = { team_id: ['3'] }
const page = { offset: '1', limit: '50' }

describe('List position actions', () => {
  describe('fetchValidSubstitutions', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()

      actions.fetchValidSubstitutions(listPositionId)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LIST_POSITION_SHOW, listPositionId })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${API_LIST_POSITIONS_PATH}/${listPositionId}`,
        successAction: success(actions.API_LIST_POSITION_SHOW),
        failureAction: failure(actions.API_LIST_POSITION_SHOW)
      })
    })
  })

  describe('clearValidSubstitutions', () => {
    it('returns the bare action', () => {
      expect(actions.clearValidSubstitutions()).toEqual({ type: actions.CLEAR_VALID_SUBSTITUTIONS })
    })
  })

  describe('fetchTradeablePlayers', () => {
    const getState = () => ({
      fplTeam: { data: FPL_TEAM_1 },
      fplTeamList: { outListPosition: LIST_POSITION_1 }
    })

    it('dispatches the bare action and fetches players scoped to league and position', () => {
      const dispatch = vi.fn()

      actions.fetchTradeablePlayers({ sort: undefined, filter: undefined, page: undefined })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actions.FETCH_TRADEABLE_PLAYERS, sort: undefined, filter: undefined, page: undefined
      })
      expect(fetchPlayers).toHaveBeenCalledWith({
        filter: { leagueId, positionId }, sort: undefined, page: undefined
      })

      actions.fetchTradeablePlayers({ sort, filter, page })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.FETCH_TRADEABLE_PLAYERS, sort, filter, page })
      expect(fetchPlayers).toHaveBeenCalledWith({ filter: { ...filter, leagueId, positionId }, sort, page })
    })
  })

  describe('updateTradeablePlayersSort', () => {
    it('dispatches the bare action and replaces the URL', () => {
      const dispatch = vi.fn()
      const historyReplaceSpy = vi.spyOn(history, 'replace')
      const getState = () => ({
        fplTeam: { data: FPL_TEAM_1 },
        fplTeamList: { outListPosition: LIST_POSITION_1 },
        players: { filter, page }
      })

      actions.updateTradeablePlayersSort(sort)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_TRADEABLE_PLAYERS_SORT, sort })

      const query = { filter: { ...filter, leagueId, positionId }, sort, page }
      expect(historyReplaceSpy).toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${id}/waiverPicks/new?${qs.stringify(query)}`)
    })
  })

  describe('updateTradeablePlayersFilter', () => {
    it('dispatches the bare action and replaces the URL', () => {
      const dispatch = vi.fn()
      const historyReplaceSpy = vi.spyOn(history, 'replace')
      const getState = () => ({
        fplTeam: { data: FPL_TEAM_1 },
        fplTeamList: { outListPosition: LIST_POSITION_1 },
        players: { sort, page }
      })

      actions.updateTradeablePlayersFilter(filter)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_TRADEABLE_PLAYERS_FILTER, filter })

      const query = { filter: { ...filter, leagueId, positionId }, sort, page: { ...page, offset: 0 } }
      expect(historyReplaceSpy).toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${id}/waiverPicks/new?${qs.stringify(query)}`)
    })
  })

  describe('updateTradeablePlayersPage', () => {
    it('dispatches the bare action and replaces the URL', () => {
      const dispatch = vi.fn()
      const historyReplaceSpy = vi.spyOn(history, 'replace')
      const getState = () => ({
        fplTeam: { data: FPL_TEAM_1 },
        fplTeamList: { outListPosition: LIST_POSITION_1 },
        players: { sort, page: { offset: 100, limit: 50 }, filter }
      })

      actions.updateTradeablePlayersPage(page.offset)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_TRADEABLE_PLAYERS_PAGE, offset: page.offset })

      const query = { filter: { ...filter, leagueId, positionId }, sort, page: { ...page, offset: page.offset } }
      expect(historyReplaceSpy).toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${id}/waiverPicks/new?${qs.stringify(query)}`)
    })
  })

  describe('fetchTradeableListPositions', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()
      const getState = () => ({ fplTeamList: { outListPosition: LIST_POSITION_1 } })

      let query: { sort: Sort, filter: Filter } = { sort: {}, filter: {} }

      actions.fetchTradeableListPositions(query)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS, ...query })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${API_LIST_POSITIONS_PATH}/${outListPositionId}/tradeable_list_positions?${stringify(query)}`,
        successAction: success(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS),
        failureAction: failure(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS)
      })

      query = { sort, filter }

      actions.fetchTradeableListPositions(query)(dispatch, getState)

      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${API_LIST_POSITIONS_PATH}/${outListPositionId}/tradeable_list_positions?${stringify(query)}`,
        successAction: success(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS),
        failureAction: failure(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS)
      })
    })

    it('defaults sort and filter when not provided', () => {
      const dispatch = vi.fn()
      const getState = () => ({ fplTeamList: { outListPosition: LIST_POSITION_1 } })

      actions.fetchTradeableListPositions({})(dispatch, getState)

      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url:
          `${API_URL}${API_LIST_POSITIONS_PATH}/${outListPositionId}/tradeable_list_positions?${stringify({ sort: {}, filter: {} })}`,
        successAction: success(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS),
        failureAction: failure(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS)
      })
    })
  })

  describe('fetchTradeableListPositionFacets', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()
      const getState = () => ({ fplTeamList: { outListPosition: LIST_POSITION_1 } })

      actions.fetchTradeableListPositionFacets()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: true,
        method: 'GET',
        url: `${API_URL}${API_LIST_POSITIONS_PATH}/${outListPositionId}/tradeable_list_position_facets`,
        successAction: success(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS),
        failureAction: failure(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS)
      })
    })
  })

  describe('updateTradeableListPositionsFilter', () => {
    it('dispatches the bare action and replaces the URL', () => {
      const dispatch = vi.fn()
      const historyReplaceSpy = vi.spyOn(history, 'replace')
      const getState = () => ({
        fplTeam: { data: FPL_TEAM_1 },
        fplTeamList: { outListPosition: LIST_POSITION_1 },
        listPosition: { sort }
      })

      actions.updateTradeableListPositionsFilter(filter)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_TRADEABLE_LIST_POSITIONS_FILTER, filter })

      const query = { filter: { ...filter, leagueId, positionId }, sort }
      expect(historyReplaceSpy).toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${id}/teamTrades/new?${qs.stringify(query)}`)
    })
  })

  describe('updateTradeableListPositionsSort', () => {
    it('dispatches the bare action and replaces the URL', () => {
      const dispatch = vi.fn()
      const historyReplaceSpy = vi.spyOn(history, 'replace')
      const getState = () => ({
        fplTeam: { data: FPL_TEAM_1 },
        fplTeamList: { outListPosition: LIST_POSITION_1 },
        listPosition: { sort: { name: 'asc' }, filter }
      })

      actions.updateTradeableListPositionsSort(sort)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_TRADEABLE_LIST_POSITIONS_SORT, sort })

      const query = { filter: { ...filter, leagueId, positionId }, sort }
      expect(historyReplaceSpy).toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${id}/teamTrades/new?${qs.stringify(query)}`)
    })
  })
})
