import { expectSaga } from 'redux-saga-test-plan'
import qs from 'qs'
import { decamelizeKeys } from 'humps'

import { API_URL, TEAMS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import teamsSagas, * as sagas from './sagas'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'

const sort = { position: 'desc' }

describe('Teams sagas', () => {
  test('fetchTeams', () => {
    expectSaga(teamsSagas, actions.fetchTeams({ sort }))
      .put({
        type: requestActions.UNAUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${TEAMS_URL}?${qs.stringify(decamelizeKeys({ sort }))}`,
        successAction: success(actions.API_TEAMS_INDEX),
        failureAction: failure(actions.API_TEAMS_INDEX)
      })
      .dispatch({ type: actions.API_TEAMS_INDEX })
      .run()
  })

  test('updateSort', () => {
    const historyPushSpy = jest.spyOn(history, 'push')

    expectSaga(sagas.updateSort, actions.updateSort(sort))
      .dispatch({ type: actions.UPDATE_TEAMS_SORT })
      .run(false)

    expect(historyPushSpy)
      .toHaveBeenCalledWith(`${TEAMS_URL}?${qs.stringify({ sort })}`)
  })
})
