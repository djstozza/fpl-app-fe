import { expectSaga } from 'redux-saga-test-plan'
import { decamelizeKeys } from 'humps'

import history from 'state/history'
import {
  API_URL,
  FPL_TEAMS_URL,
  API_FPL_TEAMS_PATH,
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import fplTeamSagas, * as sagas from './sagas'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import { FPL_TEAM_1 } from 'test/fixtures'

const fplTeamId = '1'
const fplTeam = { name: 'Fpl team 1' }
const { id } = FPL_TEAM_1

describe('Fpl team sagas', () => {
  test('fetchFplTeam', () => {
    expectSaga(fplTeamSagas)
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${API_FPL_TEAMS_PATH}/${fplTeamId}`,
        successAction: success(actions.API_FPL_TEAMS_SHOW),
        failureAction: failure(actions.API_FPL_TEAMS_SHOW)
      })
      .dispatch({ type: actions.API_FPL_TEAMS_SHOW })
      .run()
  })

  test('updateFplTeam', () => {
    expectSaga(sagas.updateFplTeam, actions.updateFplTeam({ fplTeam }))
      .withState({ fplTeam: { data: FPL_TEAM_1 }})
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'PUT',
        url: `${API_URL}${API_FPL_TEAMS_PATH}/${id}`,
        body: { fpl_team: decamelizeKeys(fplTeam) },
        successAction: success(actions.API_FPL_TEAMS_UPDATE),
        failureAction: failure(actions.API_FPL_TEAMS_UPDATE)
      })
      .dispatch({ type: actions.API_FPL_TEAMS_UPDATE })
      .run()
  })

  test('updateFplTeamSuccess', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.updateFplTeamSuccess)
      .withState({ fplTeam: { data: FPL_TEAM_1 } })
      .dispatch({ type: success(actions.API_FPL_TEAMS_UPDATE) })
      .run()

    expect(historyReplaceSpy)
      .toHaveBeenCalledWith(`${FPL_TEAMS_URL}/${id}`)
  })
})
