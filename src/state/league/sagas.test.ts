import { expectSaga } from 'redux-saga-test-plan'
import { decamelizeKeys } from 'humps'
import { stringify } from 'utilities/helpers'
import qs from 'qs'

import history from 'state/history'

import leagueSagas, * as sagas from './sagas'
import * as actions from './actions'
import * as playersActions from 'state/players/actions'
import * as requestActions from 'state/request/actions'

import {
  API_URL,
  LEAGUES_URL
} from 'utilities/constants'

import { LIVE_LEAGUE } from 'test/fixtures'
import { success, failure } from 'utilities/actions'

const { id: leagueId } = LIVE_LEAGUE
const league = { name: 'League 1', code: '1234' }
const sort = { name: 'desc' }
const filter = { position_id: ['4'] }
const page = { offset: 1, limit: 50 }

describe('League sagas', () => {
  test('fetchLeague', () => {
    expectSaga(leagueSagas, actions.fetchLeague(leagueId))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${leagueId}`,
        successAction: success(actions.API_LEAGUES_SHOW),
        failureAction: failure(actions.API_LEAGUES_SHOW)
      })
      .dispatch({ type: actions.API_LEAGUES_SHOW })
      .run()
  })

  test('updateLeagueSuccess', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.updateLeagueSuccess)
      .withState({
        league: { data: LIVE_LEAGUE }
      })
      .dispatch({ type: success(actions.API_LEAGUES_UPDATE) })
      .run()

    expect(historyReplaceSpy).toHaveBeenCalledWith(`${LEAGUES_URL}/${leagueId}`)
  })

  test('updateLeague', () => {
    expectSaga(sagas.updateLeague, actions.updateLeague({ league }))
      .withState({ league: { data: LIVE_LEAGUE } })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'PUT',
        url: `${API_URL}${LEAGUES_URL}/${leagueId}`,
        body: { league: decamelizeKeys(league) },
        successAction: success(actions.API_LEAGUES_UPDATE),
        failureAction: failure(actions.API_LEAGUES_UPDATE)
      })
      .dispatch({ type: actions.API_LEAGUES_UPDATE })
      .run()
  })

  test('fetchLeagueFplTeams', () => {
    expectSaga(sagas.fetchLeagueFplTeams, actions.fetchFplTeams({ sort }))
      .withState({ league: { data: LIVE_LEAGUE } })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${leagueId}/fpl_teams?${stringify({ sort })}`,
        successAction: success(actions.API_LEAGUE_FPL_TEAMS_INDEX),
        failureAction: failure(actions.API_LEAGUE_FPL_TEAMS_INDEX)
      })
      .dispatch({ type: actions.API_LEAGUE_FPL_TEAMS_INDEX })
      .run()
  })

  test('updateFplTeamsSort', () => {
    const historyPushSpy = jest.spyOn(history, 'push')

    expectSaga(sagas.updateFplTeamsSort, actions.updateFplTeamsSort({ sort }))
      .withState({
        league: { data: LIVE_LEAGUE }
      })
      .dispatch({ type: actions.UPDATE_LEAGUE_FPL_TEAMS_SORT })
      .run()

    expect(historyPushSpy).toHaveBeenCalledWith(`${LEAGUES_URL}/${leagueId}/fplTeams?${qs.stringify({ sort })}`)
  })

  test('generateDraftPicks', () => {
    expectSaga(leagueSagas, actions.generateDraftPicks(leagueId))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'POST',
        url: `${API_URL}${LEAGUES_URL}/${leagueId}/generate_draft_picks`,
        successAction: success(actions.API_LEAGUE_GENERATE_DRAFT_PICKS),
        failureAction: failure(actions.API_LEAGUE_GENERATE_DRAFT_PICKS)
      })
      .dispatch({ type: actions.API_LEAGUE_GENERATE_DRAFT_PICKS })
      .run()
  })

  test('generateDraftPicksSuccess', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.generateDraftPicksSuccess)
      .withState({
        league: { data: LIVE_LEAGUE }
      })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${leagueId}`,
        successAction: success(actions.API_LEAGUES_SHOW),
        failureAction: failure(actions.API_LEAGUES_SHOW)
      })
      .dispatch({ type: success(actions.API_LEAGUE_GENERATE_DRAFT_PICKS) })
      .run()

    expect(historyReplaceSpy)
      .toHaveBeenCalledWith(`${LEAGUES_URL}/${leagueId}/fplTeams?${stringify({ sort: { draft_pick_number: 'asc' } })}`)
  })

  test('createDraft', () => {
    expectSaga(leagueSagas, actions.createDraft(leagueId))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'POST',
        url: `${API_URL}${LEAGUES_URL}/${leagueId}/create_draft`,
        successAction: success(actions.API_LEAGUE_CREATE_DRAFT),
        failureAction: failure(actions.API_LEAGUE_CREATE_DRAFT)
      })
      .dispatch({ type: actions.API_LEAGUE_CREATE_DRAFT })
      .run()
  })

  test('fetchAvailablePlayers', () => {
    expectSaga(
      sagas.fetchAvailablePlayers,
      actions.fetchAvailablePlayers({ sort: undefined, filter: undefined, page: undefined })
    )
      .withState({
        league: { data: LIVE_LEAGUE }
      })
      .put({ type: playersActions.API_PLAYERS_INDEX, sort: undefined, filter: { leagueId }, page: undefined })
      .dispatch({ type: actions.FETCH_AVAILABLE_PLAYERS })
      .run()

    expectSaga(
      sagas.fetchAvailablePlayers,
      actions.fetchAvailablePlayers({ sort, filter, page })
    )
      .withState({
        league: { data: LIVE_LEAGUE }
      })
      .put({ type: playersActions.API_PLAYERS_INDEX, sort, filter: { ...filter, leagueId }, page })
      .dispatch({ type: actions.FETCH_AVAILABLE_PLAYERS })
      .run()
  })

  test('updateAvailablePlayersSort', () => {
    const historyPushSpy = jest.spyOn(history, 'push')

    expectSaga(sagas.updateAvailablePlayersSort, actions.updateAvailablePlayersSort(sort))
      .withState({
        league: { data: LIVE_LEAGUE },
        players: { filter, page, sort: { totalPoints: 'asc' } }
      })
      .dispatch({ type: actions.UPDATE_LEAGUE_FPL_TEAMS_SORT })
      .run()

    expect(historyPushSpy)
      .toHaveBeenCalledWith(`${LEAGUES_URL}/${leagueId}/draft/availablePlayers?${qs.stringify({ filter, sort, page })}`)
  })

  test('updateAvailablePlayersFilter', () => {
    const historyPushSpy = jest.spyOn(history, 'push')

    expectSaga(sagas.updateAvailablePlayersFilter, actions.updateAvailablePlayersFilter(filter))
      .withState({
        league: { data: LIVE_LEAGUE },
        players: { filter: { team_id: ['5'] }, page, sort }
      })
      .dispatch({ type: actions.UPDATE_AVAILABLE_PLAYERS_FILTER })
      .run()

    const query = {
      filter,
      sort,
      page: { ...page, offset: 0 }
    }

    expect(historyPushSpy)
      .toHaveBeenCalledWith(`${LEAGUES_URL}/${leagueId}/draft/availablePlayers?${qs.stringify(query)}`)
  })

  test('updateAvailablePlayersPage', () => {
    const historyPushSpy = jest.spyOn(history, 'push')

    expectSaga(sagas.updateAvailablePlayersPage, actions.updateAvailablePlayersPage(page.offset))
      .withState({
        league: { data: LIVE_LEAGUE },
        players: { filter, page: { offset: 100, limit: 50 }, sort }
      })
      .dispatch({ type: actions.UPDATE_AVAILABLE_PLAYERS_PAGE })
      .run()

    const query = {
      filter,
      sort,
      page
    }

    expect(historyPushSpy)
      .toHaveBeenCalledWith(`${LEAGUES_URL}/${leagueId}/draft/availablePlayers?${qs.stringify(query)}`)
  })
})
