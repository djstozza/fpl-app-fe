import { expectSaga } from 'redux-saga-test-plan'
import qs from 'qs'

import { API_URL, TEAMS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import teamSagas, * as sagas from './sagas'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import * as playersActions from 'state/players/actions'
import history from 'state/history'
import { stringify } from 'utilities/helpers'

import { MANCHESTER_UNITED } from 'test/fixtures'

const { id: teamId } = MANCHESTER_UNITED
const sort = {
  players: { lastName: 'asc' },
  fixtures: { leg: 'desc' }
}

describe('Team sagas', () => {
  test('fetchTeam', () => {
    expectSaga(teamSagas)
      .put({
        type: requestActions.UNAUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${TEAMS_URL}/${teamId}`,
        successAction: success(actions.API_TEAMS_SHOW),
        failureAction: failure(actions.API_TEAMS_SHOW)
      })
      .dispatch({ type: actions.API_TEAMS_SHOW })
      .run()
  })

  test('fetchTeamPlayers', () => {
    expectSaga(sagas.fetchTeamPlayers, actions.fetchTeamPlayers({ id: teamId, sort }))
      .put({ type: playersActions.API_PLAYERS_INDEX, sort: sort.players, filter: { teamId }, page: undefined })
      .dispatch({ type: actions.FETCH_TEAM_PLAYERS })
      .run()
  })

  test('fetchTeamFixtures', () => {
    expectSaga(sagas.fetchTeamFixtures, actions.fetchTeamFixtures({ id: teamId, tab: 'details', sort }))
      .put({
        type: requestActions.UNAUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${TEAMS_URL}/${teamId}/fixtures?${stringify({ sort: sort.fixtures })}`,
        successAction: success(actions.API_TEAMS_FIXTURES_INDEX),
        failureAction: failure(actions.API_TEAMS_FIXTURES_INDEX)
      })
      .dispatch({ type: actions.API_TEAMS_FIXTURES_INDEX })
      .run()
  })

  test('updateTeamPlayersSort', () => {
    const historyPushSpy = jest.spyOn(history, 'push')
    const tab = 'players'

    expectSaga(sagas.updateTeamPlayersSort, actions.updateTeamPlayersSort({ tab, sort: sort.players } ))
      .withState({
        team: { data: MANCHESTER_UNITED }
      })
      .dispatch({ type: actions.UPDATE_TEAM_PLAYERS_SORT })
      .run()

    expect(historyPushSpy)
      .toHaveBeenCalledWith(`${TEAMS_URL}/${teamId}/${tab}?${qs.stringify({ sort: { players: sort.players } })}`)
  })

  test('updateTeamFixturesSort', () => {
    const historyPushSpy = jest.spyOn(history, 'push')
    const tab = 'fixtures'

    expectSaga(sagas.updateTeamFixturesSort, actions.updateTeamFixturesSort({ tab, sort: sort.fixtures } ))
      .withState({
        team: { data: MANCHESTER_UNITED }
      })
      .dispatch({ type: actions.UPDATE_TEAM_FIXTURES_SORT })
      .run()

    expect(historyPushSpy)
      .toHaveBeenCalledWith(`${TEAMS_URL}/${teamId}/${tab}?${qs.stringify({ sort: { fixtures: sort.fixtures } })}`)
  })
})
