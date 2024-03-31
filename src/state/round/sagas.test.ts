import { expectSaga } from 'redux-saga-test-plan'

import { API_URL, ROUNDS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import sagas from './sagas'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'

const roundId = 4

describe('Round sagas', () => {
  test('fetchRound', () => {
    expectSaga(sagas)
      .put({
        type: requestActions.UNAUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${ROUNDS_URL}/${roundId}`,
        successAction: success(actions.API_ROUNDS_SHOW),
        failureAction: failure(actions.API_ROUNDS_SHOW)
      })
      .dispatch({ type: actions.API_ROUNDS_SHOW })
      .run()
  })
})
