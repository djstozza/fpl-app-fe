import { expectSaga } from 'redux-saga-test-plan'
import { decamelizeKeys } from 'humps'
import { stringify } from 'utilities/helpers'
import qs from 'qs'

import { success, failure } from 'utilities/actions'
import miniDraftPicksSagas, * as sagas  from './sagas'
import * as actions from './actions'
import * as fplTeamListActions from 'state/fplTeamList/actions'
import * as playersActions from 'state/players/actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'
import {
  API_URL,
  LEAGUES_URL,
  API_FPL_TEAM_LISTS_PATH
} from 'utilities/constants'
import { LIVE_LEAGUE, LIST_POSITION_1 } from 'test/fixtures'

const { id } = LIVE_LEAGUE
const season = 'winder'
const sort = { lastName: 'desc' }
const filter = { team_id: ['3'] }
const page = { offset: 51, limit: 50 }
const fplTeamListId = '12'
const inPlayerId = '352'
const { id: listPositionId, position: { id: positionId } } = LIST_POSITION_1

describe('Mini draft picks', () => {
  test('fetchMiniDraftPicks', () => {
    const query = { mini_draft_pick: { season }, sort, filter }

    expectSaga(miniDraftPicksSagas, actions.fetchMiniDraftPicks({ sort, filter }))
      .withState({
        league: { data: LIVE_LEAGUE },
        miniDraftPicks: { season }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${id}/mini_draft_picks?${stringify(query)}`,
        successAction: success(actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX),
        failureAction: failure(actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX)
      })
      .dispatch({ type: actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX })
      .run()
  })

  test('fetchMiniDraftPickFacets', () => {
    expectSaga(sagas.fetchMiniDraftPickFacets, actions.fetchMiniDraftPickFacets())
      .withState({
        league: { data: LIVE_LEAGUE },
        miniDraftPicks: { season }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${id}/mini_draft_picks/facets?${stringify({ mini_draft_pick: { season } })}`,
        successAction: success(actions.API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX),
        failureAction: failure(actions.API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX)
      })
      .dispatch({ type: actions.API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX })
      .run()
  })

  test('updateFilter', () => {
    const historyPushSpy = jest.spyOn(history, 'push')

    expectSaga(sagas.updateFilter, actions.updateFilter(filter))
      .withState({
        league: { data: LIVE_LEAGUE },
        miniDraftPicks: { sort }
      })
      .dispatch({ type: actions.UPDATE_MINI_DRAFT_PICKS_FILTER })
      .run()

    const query = {
      filter,
      sort
    }

    expect(historyPushSpy).toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/miniDraft/miniDraftPicks?${qs.stringify(query)}`)
  })

  test('updateSort', () => {
    const historyPushSpy = jest.spyOn(history, 'push')

    expectSaga(sagas.updateSort, actions.updateSort(sort))
      .withState({
        league: { data: LIVE_LEAGUE },
        miniDraftPicks: { filter }
      })
      .dispatch({ type: actions.UPDATE_MINI_DRAFT_PICKS_SORT })
      .run()

    const query = {
      filter,
      sort
    }

    expect(historyPushSpy).toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/miniDraft/miniDraftPicks?${qs.stringify(query)}`)
  })

  test('fetchMiniDraftPicksStatus', () => {
    expectSaga(sagas.fetchMiniDraftPicksStatus, actions.fetchMiniDraftPicksStatus(id))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${id}/mini_draft_picks/status`,
        successAction: success(actions.API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX),
        failureAction: failure(actions.API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX)
      })
      .dispatch({ type: actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX })
      .run()
  })

  test('createMiniDraftPick', () => {
    expectSaga(sagas.createMiniDraftPick, actions.createMiniDraftPick(inPlayerId))
      .withState({
        miniDraftPicks: { fplTeamListId },
        fplTeamList: { outListPosition: LIST_POSITION_1 }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'POST',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/list_positions/${listPositionId}/mini_draft_picks`,
        body: { mini_draft_pick: decamelizeKeys({ inPlayerId }) },
        successAction: success(actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE),
        failureAction: failure(actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE)
      })
      .dispatch({ type: actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE })
      .run()
  })

  test('passMiniDraftPick', () => {
    expectSaga(sagas.passMiniDraftPick, actions.passMiniDraftPick())
      .withState({
        miniDraftPicks: { fplTeamListId }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'POST',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}/${fplTeamListId}/mini_draft_picks`,
        body: { mini_draft_pick: decamelizeKeys({ passed: true }) },
        successAction: success(actions.API_LEAGUE_MINI_DRAFT_PICK_PASS),
        failureAction: failure(actions.API_LEAGUE_MINI_DRAFT_PICK_PASS)
      })
      .dispatch({ type: actions.API_LEAGUE_MINI_DRAFT_PICK_PASS })
      .run()
  })

  test(`createMiniDraftPickSuccess - ${success(actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE)}`, () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.createMiniDraftPickSuccess)
      .withState({
        league: { data: LIVE_LEAGUE }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${id}/mini_draft_picks/status`,
        successAction: success(actions.API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX),
        failureAction: failure(actions.API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX)
      })
      .put({ type: fplTeamListActions.SET_OUT_LIST_POSITION, outListPosition: undefined })
      .dispatch({ type: success(actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE) })
      .run()

    expect(historyReplaceSpy)
      .toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/miniDraft`)
  })

  test(`createMiniDraftPickSuccess - ${success(actions.API_LEAGUE_MINI_DRAFT_PICK_PASS)}`, () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.createMiniDraftPickSuccess)
      .withState({
        league: { data: LIVE_LEAGUE }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${id}/mini_draft_picks/status`,
        successAction: success(actions.API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX),
        failureAction: failure(actions.API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX)
      })
      .put({ type: fplTeamListActions.SET_OUT_LIST_POSITION, outListPosition: undefined })
      .dispatch({ type: success(actions.API_LEAGUE_MINI_DRAFT_PICK_PASS) })
      .run()

    expect(historyReplaceSpy)
      .toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/miniDraft`)
  })

  test('fetchTradeablePlayers', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.fetchTradeablePlayers, actions.fetchTradeablePlayers({ sort, filter, page }))
      .withState({
        league: { data: LIVE_LEAGUE },
        fplTeamList: { outListPosition: LIST_POSITION_1 }
      })
      .put({
        type: playersActions.API_PLAYERS_INDEX,
        sort,
        filter: { ...filter, leagueId: id, positionId },
        page
      })
      .dispatch({ type: actions.MINI_DRAFT_FETCH_TRADEABLE_PLAYERS })
      .run()
  })

  test('updateAvailablePlayersSort', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.updateAvailablePlayersSort, actions.updateTradeablePlayersSort(sort))
      .withState({
        league: { data: LIVE_LEAGUE },
        fplTeamList: { outListPosition: LIST_POSITION_1 },
        players: { filter, page }
      })
      .dispatch({ type: actions.UPDATE_TRADEABLE_PLAYERS_SORT })
      .run()

    const query = { filter: { ...filter, leagueId: id, positionId }, sort, page }

    expect(historyReplaceSpy)
      .toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/miniDraft/tradeableListPositions?${qs.stringify(query)}`)
  })

  test('updateAvailablePlayersFilter', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.updateAvailablePlayersFilter, actions.updateTradeablePlayersFilter(filter))
      .withState({
        league: { data: LIVE_LEAGUE },
        fplTeamList: { outListPosition: LIST_POSITION_1 },
        players: { sort, page }
      })
      .dispatch({ type: actions.UPDATE_TRADEABLE_PLAYERS_FILTER })
      .run()

    const query = { filter: { ...filter, leagueId: id, positionId }, sort, page: { ...page, offset: 0 } }

    expect(historyReplaceSpy)
      .toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/miniDraft/tradeableListPositions?${qs.stringify(query)}`)
  })

  test('updateAvailablePlayersPage', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.updateAvailablePlayersPage, actions.updateTradeablePlayersPage(page.offset))
      .withState({
        league: { data: LIVE_LEAGUE },
        fplTeamList: { outListPosition: LIST_POSITION_1 },
        players: { sort, page: { offset: 100, limit: 50 }, filter }
      })
      .dispatch({ type: actions.UPDATE_TRADEABLE_PLAYERS_FILTER })
      .run()

    const query = { filter: { ...filter, leagueId: id, positionId }, sort, page: { ...page, offset: page.offset } }

    expect(historyReplaceSpy)
      .toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/miniDraft/tradeableListPositions?$${qs.stringify(query)}`)
  })
})
