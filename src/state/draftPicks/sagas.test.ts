import { expectSaga } from 'redux-saga-test-plan'
import { decamelizeKeys } from 'humps'
import { stringify } from 'utilities/helpers'
import qs from 'qs'

import draftPicksSagas, * as sagas from './sagas'
import * as actions from './actions'
import { requestActions } from 'state/request'
import {
  API_URL,
  LEAGUES_URL
} from 'utilities/constants'
import { LIVE_LEAGUE } from 'test/fixtures'
import { success, failure } from 'utilities/actions'
import history from 'state/history'

const sort = { pickNumber: 'asc' }
const filter = { team_id: ['1'] }
const { id } = LIVE_LEAGUE
const nextDraftPickId = '4'
const playerId = '351'
const leagueId = '1'

describe('DraftPicks sagas', () => {
  test('fetchDraftPicks', () => {
    expectSaga(draftPicksSagas)
      .withState({ league: { data: LIVE_LEAGUE } })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${id}/draft_picks?${stringify({ sort, filter })}`,
        successAction: success(actions.API_LEAGUE_DRAFT_PICKS_INDEX),
        failureAction: failure(actions.API_LEAGUE_DRAFT_PICKS_INDEX)
      })
      .dispatch({ type: actions.API_LEAGUE_DRAFT_PICKS_INDEX, sort })
      .run()

    expectSaga(sagas.fetchDraftPicks, actions.fetchDraftPicks({ sort }))
      .withState({ league: { data: LIVE_LEAGUE } })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${id}/draft_picks?${stringify({ sort })}`,
        successAction: success(actions.API_LEAGUE_DRAFT_PICKS_INDEX),
        failureAction: failure(actions.API_LEAGUE_DRAFT_PICKS_INDEX)
      })
      .dispatch({ type: actions.API_LEAGUE_DRAFT_PICKS_INDEX, sort })
      .run()
  })

  test('fetchDraftPickFacets', () => {
    expectSaga(sagas.fetchDraftPickFacets)
      .withState({ league: { data: LIVE_LEAGUE } })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${id}/draft_picks/facets`,
        successAction: success(actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX),
        failureAction: failure(actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX)
      })
      .dispatch({ type: actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX })
      .run()
  })

  test('updateFilter', () => {
    const historyPushSpy = jest.spyOn(history, 'push')

    expectSaga(sagas.updateFilter, actions.updateFilter(filter))
      .withState({ league: { data: LIVE_LEAGUE }, draftPicks: { sort } })
      .dispatch({ type: actions.UPDATE_DRAFT_PICKS_FILTER })
      .run()

    expect(historyPushSpy)
      .toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/draft/draftPicks?${qs.stringify({ filter, sort })}`)
  })

  test('updateSort', () => {
    const historyPushSpy = jest.spyOn(history, 'push')

    expectSaga(sagas.updateSort, actions.updateSort(sort))
      .withState({ league: { data: LIVE_LEAGUE }, draftPicks: { filter } })
      .dispatch({ type: actions.UPDATE_DRAFT_PICKS_SORT })
      .run()

    expect(historyPushSpy)
      .toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/draft/draftPicks?${qs.stringify({ filter, sort })}`)
  })

  test('fetchDraftPicksStatus', () => {
    expectSaga(sagas.fetchDraftPicksStatus, actions.fetchDraftPicksStatus(leagueId))
      .withState({ league: { data: LIVE_LEAGUE } })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${leagueId}/draft_picks/status`,
        successAction: success(actions.API_LEAGUE_DRAFT_PICKS_STATUS_INDEX),
        failureAction: failure(actions.API_LEAGUE_DRAFT_PICKS_STATUS_INDEX)
      })
      .dispatch({ type: actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX })
      .run()
  })

  test('updateDraftPick', () => {
    expectSaga(sagas.updateDraftPick, actions.updateDraftPick({ playerId: '351', nextDraftPickId }))
      .withState({ league: { data: LIVE_LEAGUE }, draftPicks: { sort, filter } })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'PUT',
        url: `${API_URL}${LEAGUES_URL}/${id}/draft_picks/${nextDraftPickId}?${stringify({ sort, filter })}`,
        body: { league: decamelizeKeys({ playerId, miniDraft: undefined }) },
        successAction: success(actions.API_LEAGUE_DRAFT_PICK_UPDATE),
        failureAction: failure(actions.API_LEAGUE_DRAFT_PICK_UPDATE)
      })
      .dispatch({ type: actions.API_LEAGUE_DRAFT_PICK_UPDATE })
      .run()

    expectSaga(sagas.updateDraftPick, actions.updateDraftPick({ miniDraft: true, nextDraftPickId }))
      .withState({ league: { data: LIVE_LEAGUE }, draftPicks: { sort, filter } })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'PUT',
        url: `${API_URL}${LEAGUES_URL}/${id}/draft_picks/${nextDraftPickId}?${stringify({ sort, filter })}`,
        body: { league: decamelizeKeys({ playerId: undefined, miniDraft: true }) },
        successAction: success(actions.API_LEAGUE_DRAFT_PICK_UPDATE),
        failureAction: failure(actions.API_LEAGUE_DRAFT_PICK_UPDATE)
      })
      .dispatch({ type: actions.API_LEAGUE_DRAFT_PICK_UPDATE })
      .run()
  })

  test('updateDraftPickSuccess', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.updateDraftPickSuccess)
      .withState({ league: { data: LIVE_LEAGUE } })
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}/${leagueId}/draft_picks/status`,
        successAction: success(actions.API_LEAGUE_DRAFT_PICKS_STATUS_INDEX),
        failureAction: failure(actions.API_LEAGUE_DRAFT_PICKS_STATUS_INDEX)
      })
      .dispatch({ type: actions.UPDATE_DRAFT_PICKS_SORT })
      .run()

    expect(historyReplaceSpy)
      .toHaveBeenCalledWith(`${LEAGUES_URL}/${id}/draft`)
  })

})
