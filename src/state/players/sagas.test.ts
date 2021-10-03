import { expectSaga } from 'redux-saga-test-plan'
import qs from 'qs'
import { stringify } from 'utilities/helpers'

import { API_URL, PLAYERS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import playersSagas, * as sagas from './sagas'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'

const sort = { lastName: 'desc' }
const filter = { position_id: ['4'] }
const page = { offset: 101, limit: 50 }

describe('Players sagas', () => {
  test('fetchPlayers', () => {
    expectSaga(playersSagas, actions.fetchPlayers({ sort, filter, page }))
      .put({
        type: requestActions.UNAUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${PLAYERS_URL}?${stringify({ sort, filter, page })}`,
        successAction: success(actions.API_PLAYERS_INDEX),
        failureAction: failure(actions.API_PLAYERS_INDEX)
      })
      .dispatch({ type: actions.API_PLAYERS_INDEX })
      .run()
  })

  test('fetchFacets', () => {
    expectSaga(sagas.fetchFacets)
      .put({
        type: requestActions.UNAUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${PLAYERS_URL}/facets`,
        successAction: success(actions.API_PLAYERS_FACETS_INDEX),
        failureAction: failure(actions.API_PLAYERS_FACETS_INDEX)
      })
      .dispatch({ type: actions.API_PLAYERS_INDEX })
      .run()
  })

  test('updateSort', () => {
    const historyPushSpy = jest.spyOn(history, 'push')

    expectSaga(sagas.updateSort, actions.updateSort(sort))
      .withState({
        players: { filter, page }
      })
      .dispatch({ type: actions.UPDATE_PLAYERS_SORT })
      .run()

    const query = { filter, sort, page }

    expect(historyPushSpy)
      .toHaveBeenCalledWith(`${PLAYERS_URL}?${qs.stringify(query)}`)
  })

  test('updateFilter', () => {
    const historyPushSpy = jest.spyOn(history, 'push')

    expectSaga(sagas.updateFilter, actions.updateFilter(filter))
      .withState({
        players: { sort, page }
      })
      .dispatch({ type: actions.UPDATE_PLAYERS_FILTER })
      .run()

    const query = { filter, sort, page: { ...page, offset: 0 } }

    expect(historyPushSpy)
      .toHaveBeenCalledWith(`${PLAYERS_URL}?${qs.stringify(query)}`)
  })

  test('updatePage', () => {
    const historyPushSpy = jest.spyOn(history, 'push')

    expectSaga(sagas.updatePage, actions.updatePage(page.offset))
      .withState({
        players: { sort, page: { offset: 100, limit: 50 }, filter }
      })
      .dispatch({ type: actions.UPDATE_PLAYERS_PAGE })
      .run()

    const query = { filter, sort, page: { ...page, offset: page.offset } }

    expect(historyPushSpy)
      .toHaveBeenCalledWith(`${PLAYERS_URL}?${qs.stringify(query)}`)
  })
})
