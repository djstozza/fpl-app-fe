import { expectSaga } from 'redux-saga-test-plan'

import { API_URL, ROUNDS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import sagas from './sagas'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'

describe('Rounds sagas', () => {
  test('fetchRounds', () => {
    expectSaga(sagas)
      .put({
        type: requestActions.UNAUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${ROUNDS_URL}`,
        successAction: success(actions.API_ROUNDS_INDEX),
        failureAction: failure(actions.API_ROUNDS_INDEX)
      })
      .dispatch({ type: actions.API_ROUNDS_INDEX })
      .run()
  })
})
