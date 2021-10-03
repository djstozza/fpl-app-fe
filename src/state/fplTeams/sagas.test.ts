import { expectSaga } from 'redux-saga-test-plan'

import history from 'state/history'
import { stringify } from 'utilities/helpers'

import fplTeamsSagas, * as sagas from './sagas'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'

import {
  API_URL,
  PROFILE_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAMS_PATH,
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'
const sort = { name: 'asc' }

describe('Fpl teams sagas', () => {
  test('fetchFplTeams', () => {
    expectSaga(fplTeamsSagas, actions.fetchFplTeams())
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAMS_PATH}`,
        successAction: success(actions.API_FPL_TEAMS_INDEX),
        failureAction: failure(actions.API_FPL_TEAMS_INDEX)
      })
      .dispatch({ type: actions.API_FPL_TEAM_INDEX })
      .run()

    expectSaga(sagas.fetchFplTeams, actions.fetchFplTeams())
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAMS_PATH}`,
        successAction: success(actions.API_FPL_TEAMS_INDEX),
        failureAction: failure(actions.API_FPL_TEAMS_INDEX)
      })
      .dispatch({ type: actions.API_FPL_TEAM_INDEX })
      .run()
  })

  test('updateSort', () => {
    const historyPushSpy = jest.spyOn(history, 'push')

    expectSaga(sagas.updateSort, actions.updateFplTeamsSort(sort))
      .dispatch({ type: actions.UPDATE_FPL_TEAMS_SORT })
      .run()

    expect(historyPushSpy)
      .toHaveBeenCalledWith(`${PROFILE_URL}${FPL_TEAMS_URL}?${stringify({ sort })}`)
  })
})
