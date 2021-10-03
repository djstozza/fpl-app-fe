import { expectSaga } from 'redux-saga-test-plan'
import qs from 'qs'

import { API_URL, PLAYERS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import playerSagas, * as sagas from './sagas'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import { stringify } from 'utilities/helpers'
import history from 'state/history'

import { PLAYER_SUMMARIES } from 'test/fixtures'

const { id: playerId } = PLAYER_SUMMARIES[0]
const sort = {
  history: {
    kickoffTime: 'desc'
  },
  historyPast: {
    seasonName: 'asc'
  }
}

describe('Player sagas', () => {
  test('fetchPlayer', () => {
    expectSaga(playerSagas, actions.fetchPlayer(playerId))
      .put({
        type: requestActions.UNAUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${PLAYERS_URL}/${playerId}`,
        successAction: success(actions.API_PLAYERS_SHOW),
        failureAction: failure(actions.API_PLAYERS_SHOW)
      })
      .dispatch({ type: actions.API_PLAYERS_SHOW })
      .run()
  })

  test('fetchPlayerHistory', () => {
    expectSaga(sagas.fetchPlayerHistory, actions.fetchPlayerHistory({ id: playerId, sort }))
      .put({
        type: requestActions.UNAUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${PLAYERS_URL}/${playerId}/history?${stringify({ sort: sort.history })}`,
        successAction: success(actions.API_PLAYERS_HISTORY_INDEX),
        failureAction: failure(actions.API_PLAYERS_HISTORY_INDEX)
      })
      .dispatch({ type: actions.API_PLAYERS_HISTORY_INDEX })
      .run()
  })

  test('fetchPlayerHistoryPast', () => {
    expectSaga(sagas.fetchPlayerHistoryPast, actions.fetchPlayerHistoryPast({ id: playerId, sort }))
      .put({
        type: requestActions.UNAUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${PLAYERS_URL}/${playerId}/history_past?${stringify({ sort: sort.historyPast })}`,
        successAction: success(actions.API_PLAYERS_HISTORY_PAST_INDEX),
        failureAction: failure(actions.API_PLAYERS_HISTORY_PAST_INDEX)
      })
      .dispatch({ type: actions.API_PLAYERS_HISTORY_PAST_INDEX })
      .run()
  })

  test('updatePlayerHistorySort', () => {
    const historyPushSpy = jest.spyOn(history, 'push')

    expectSaga(sagas.updatePlayerHistorySort, actions.updatePlayerHistorySort({ sort: sort.history }))
      .withState({
        player: { data: PLAYER_SUMMARIES[0] }
      })
      .dispatch({ type: actions.UPDATE_PLAYER_HISTORY_SORT })
      .run()

    expect(historyPushSpy)
      .toHaveBeenCalledWith(`${PLAYERS_URL}/${playerId}/history?${qs.stringify({ sort: { history: sort.history } })}`)
  })

  test('updatePlayerHistoryPastSort', () => {
    const historyPushSpy = jest.spyOn(history, 'push')

    expectSaga(sagas.updatePlayerHistoryPastSort, actions.updatePlayerHistoryPastSort({ sort: sort.historyPast }))
      .withState({
        player: { data: PLAYER_SUMMARIES[0] }
      })
      .dispatch({ type: actions.UPDATE_PLAYER_HISTORY_PAST_SORT })
      .run()

    expect(historyPushSpy)
      .toHaveBeenCalledWith(`${PLAYERS_URL}/${playerId}/historyPast?${qs.stringify({ sort: { historyPast: sort.historyPast } })}`)
  })
})
