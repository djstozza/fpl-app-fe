import { expectSaga } from 'redux-saga-test-plan'
import { decamelizeKeys } from 'humps'
import qs from 'qs'

import history from 'state/history'

import leaguesSagas, * as sagas from './sagas'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'

import {
  API_URL,
  PROFILE_URL,
  LEAGUES_URL,
  JOIN_LEAGUE_URL
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

const league = { name: 'League 1', code: '1234', fplTeamName: 'Fpl team 1' }
const sort = { name: 'desc' }

describe('Leagues sagas', () => {
  test('fetchLeagues', () => {
    expectSaga(leaguesSagas, actions.fetchLeagues())
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${LEAGUES_URL}`,
        successAction: success(actions.API_LEAGUES_INDEX),
        failureAction: failure(actions.API_LEAGUES_INDEX)
      })
      .dispatch({ type: actions.API_LEAGUES_INDEX })
      .run()
  })

  test('createLeague', () => {
    expectSaga(leaguesSagas, actions.createLeague({ league }))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'POST',
        url: `${API_URL}${LEAGUES_URL}`,
        body: { league: decamelizeKeys(league) },
        successAction: success(actions.API_LEAGUES_CREATE),
        failureAction: failure(actions.API_LEAGUES_CREATE)
      })
      .dispatch({ type: actions.API_LEAGUES_CREATE })
      .run()
  })

  test('joinLeague', () => {
    expectSaga(leaguesSagas, actions.joinLeague({ league }))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'POST',
        url: `${API_URL}${JOIN_LEAGUE_URL}`,
        body: { league: decamelizeKeys(league) },
        successAction: success(actions.API_LEAGUES_JOIN),
        failureAction: failure(actions.API_LEAGUES_JOIN)
      })
      .dispatch({ type: actions.API_LEAGUES_JOIN })
      .run()
  })

  test(`leagueSuccess - ${success(actions.API_LEAGUES_CREATE)}`, () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.leagueSuccess)
      .dispatch({ type: success(actions.API_LEAGUES_CREATE) })
      .run()

    expect(historyReplaceSpy).toHaveBeenCalledWith(`${PROFILE_URL}${LEAGUES_URL}`)
  })

  test(`leagueSuccess - ${success(actions.API_LEAGUES_JOIN)}`, () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.leagueSuccess)
      .dispatch({ type: success(actions.API_LEAGUES_JOIN) })
      .run()

    expect(historyReplaceSpy).toHaveBeenCalledWith(`${PROFILE_URL}${LEAGUES_URL}`)
  })

  test('updateSort', () => {
    const historyPushSpy = jest.spyOn(history, 'push')

    expectSaga(sagas.updateSort, actions.updateSort(sort))
      .dispatch({ type: actions.UPDATE_LEAGUES_SORT })
      .run()

    expect(historyPushSpy).toHaveBeenCalledWith(`${PROFILE_URL}${LEAGUES_URL}?${qs.stringify({ sort })}`)
  })
})
