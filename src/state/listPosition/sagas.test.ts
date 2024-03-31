import { expectSaga } from 'redux-saga-test-plan'
import qs from 'qs'
import { stringify } from 'utilities/helpers'

import listPositionSagas, * as sagas from './sagas'
import * as actions from './actions'
import * as playersActions from 'state/players/actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'

import {
  API_URL,
  FPL_TEAMS_URL,
  API_LIST_POSITIONS_PATH,
} from 'utilities/constants'

import { FPL_TEAM_1, LIST_POSITION_1 } from 'test/fixtures'
import { success, failure } from 'utilities/actions'

const listPositionId = '23'
const { id, league: { id: leagueId } } = FPL_TEAM_1
const { id: outListPositionId, position: { id: positionId } } = LIST_POSITION_1
const sort = { name: 'desc' }
const filter = { team_id: ['3'] }
const page = { offset: '1', limit: '50' }

describe('List position sagas', () => {
  test('fetchValidSubstitutions', () => {
    expectSaga(listPositionSagas)
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${API_LIST_POSITIONS_PATH}/${listPositionId}`,
        successAction: success(actions.API_LIST_POSITION_SHOW),
        failureAction: failure(actions.API_LIST_POSITION_SHOW)
      })
      .dispatch({ type: actions.API_LIST_POSITION_SHOW })
      .run()
  })

  test('fetchTradeablePlayers', () => {
    expectSaga(
      sagas.fetchTradeablePlayers,
      actions.fetchTradeablePlayers({ sort: undefined, filter: undefined, page: undefined })
    )
      .withState({
        fplTeam: { data: FPL_TEAM_1 },
        fplTeamList: { outListPosition: LIST_POSITION_1 }
      })
      .put({
        type: playersActions.API_PLAYERS_INDEX,
        sort: undefined,
        filter: { leagueId, positionId },
        page: undefined
      })
      .dispatch({ type: actions.FETCH_TRADEABLE_PLAYERS })
      .run()

    expectSaga(
      sagas.fetchTradeablePlayers,
      actions.fetchTradeablePlayers({ sort, filter, page })
    )
      .withState({
        fplTeam: { data: FPL_TEAM_1 },
        fplTeamList: { outListPosition: LIST_POSITION_1 }
      })
      .put({
        type: playersActions.API_PLAYERS_INDEX,
        sort,
        filter: {
          ...filter,
          leagueId,
          positionId
        },
        page
      })
      .dispatch({ type: actions.FETCH_TRADEABLE_PLAYERS })
      .run()
  })

  test('updateAvailablePlayersSort', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.updateAvailablePlayersSort, actions.updateTradeablePlayersSort(sort))
      .withState({
        fplTeam: { data: FPL_TEAM_1 },
        fplTeamList: { outListPosition: LIST_POSITION_1 },
        players: { filter, page }
      })
      .dispatch({ type: actions.UPDATE_TRADEABLE_PLAYERS_SORT })
      .run()

    const query = { filter: { ...filter, leagueId, positionId }, sort, page }

    expect(historyReplaceSpy)
      .toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${id}/waiverPicks/new?${qs.stringify(query)}`)
  })

  test('updateAvailablePlayersFilter', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.updateAvailablePlayersFilter, actions.updateTradeablePlayersFilter(filter))
      .withState({
        fplTeam: { data: FPL_TEAM_1 },
        fplTeamList: { outListPosition: LIST_POSITION_1 },
        players: { sort, page }
      })
      .dispatch({ type: actions.UPDATE_TRADEABLE_PLAYERS_FILTER })
      .run()

    const query = { filter: { ...filter, leagueId, positionId }, sort, page: { ...page, offset: 0 } }

    expect(historyReplaceSpy)
      .toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${id}/waiverPicks/new?${qs.stringify(query)}`)
  })

  test('updateAvailablePlayersPage', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.updateAvailablePlayersPage, actions.updateTradeablePlayersPage(page.offset))
      .withState({
        fplTeam: { data: FPL_TEAM_1 },
        fplTeamList: { outListPosition: LIST_POSITION_1 },
        players: { sort, page: { offset: 100, limit: 50 }, filter }
      })
      .dispatch({ type: actions.UPDATE_TRADEABLE_PLAYERS_PAGE })
      .run()

    const query = { filter: { ...filter, leagueId, positionId }, sort, page: { ...page, offset: page.offset } }

    expect(historyReplaceSpy)
      .toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${id}/waiverPicks/new?${qs.stringify(query)}`)
  })

  test('fetchTradeableListPositions', () => {
    let query = { sort: {}, filter: {} }

    expectSaga(sagas.fetchTradeableListPositions, actions.fetchTradeableListPositions(query))
      .withState({
        fplTeamList: { outListPosition: LIST_POSITION_1 }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${API_LIST_POSITIONS_PATH}/${outListPositionId}/tradeable_list_positions?${stringify(query)}`,
        successAction: success(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS),
        failureAction: failure(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS)
      })
      .dispatch({ type: actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS })
      .run()

    query = { sort, filter }

    expectSaga(sagas.fetchTradeableListPositions, actions.fetchTradeableListPositions(query))
      .withState({
        fplTeamList: { outListPosition: LIST_POSITION_1 }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${API_LIST_POSITIONS_PATH}/${outListPositionId}/tradeable_list_positions?${stringify(query)}`,
        successAction: success(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS),
        failureAction: failure(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS)
      })
      .dispatch({ type: actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS })
      .run()
  })

  test('fetchTradeableListPositionFacets', () => {
    expectSaga(sagas.fetchTradeableListPositionFacets)
      .withState({
        fplTeamList: { outListPosition: LIST_POSITION_1 }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${API_LIST_POSITIONS_PATH}/${outListPositionId}/tradeable_list_position_facets`,
        successAction: success(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS),
        failureAction: failure(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS)
      })
      .dispatch({ type: actions.API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS })
      .run()
  })

  test('updateTradeableListPositionsFilter', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.updateTradeableListPositionsFilter, actions.updateTradeableListPositionsFilter(filter))
      .withState({
        fplTeam: { data: FPL_TEAM_1 },
        fplTeamList: { outListPosition: LIST_POSITION_1 },
        listPosition: { sort }
      })
      .dispatch({ type: actions.UPDATE_TRADEABLE_LIST_POSITIONS_FILTER })
      .run()

    const query = { filter: { ...filter, leagueId, positionId }, sort }

    expect(historyReplaceSpy)
      .toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${id}/teamTrades/new?${qs.stringify(query)}`)
  })

  test('updateTradeableListPositionsSort', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.updateTradeableListPositionsSort, actions.updateTradeableListPositionsSort(sort))
      .withState({
        fplTeam: { data: FPL_TEAM_1 },
        fplTeamList: { outListPosition: LIST_POSITION_1 },
        listPosition: { sort: { name: 'asc' }, filter }
      })
      .dispatch({ type: actions.UPDATE_TRADEABLE_LIST_POSITIONS_FILTER })
      .run()

    const query = { filter: { ...filter, leagueId, positionId }, sort }

    expect(historyReplaceSpy)
      .toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${id}/teamTrades/new?${qs.stringify(query)}`)
  })
})
