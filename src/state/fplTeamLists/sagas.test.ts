import { expectSaga } from 'redux-saga-test-plan'

import fplTeamListsSagas from './sagas'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import { stringify } from 'utilities/helpers'

import {
  API_URL,
  API_FPL_TEAM_LISTS_PATH,
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

const fplTeamId = '4'

describe('Fpl team lists sagas', () => {
  test('fetchFplTeamLists', () => {
    expectSaga(fplTeamListsSagas, actions.fetchFplTeamLists(fplTeamId))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAM_LISTS_PATH}?${stringify({ fplTeamList: { fplTeamId } })}`,
        successAction: success(actions.API_FPL_TEAM_LISTS_INDEX),
        failureAction: failure(actions.API_FPL_TEAM_LISTS_INDEX)
      })
      .dispatch({ type: actions.API_FPL_TEAM_LISTS_INDEX })
      .run()
  })
})
