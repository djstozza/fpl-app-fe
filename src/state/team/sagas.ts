import { put, takeLatest, takeEvery, all, fork, select } from 'redux-saga/effects'
import qs from 'qs'

import { API_URL, TEAMS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import { fetchPlayers } from 'state/players/actions'
import history from 'state/history'
import { stringify } from 'utilities/helpers'

function * fetchTeamPlayers (action) : Generator<any, any, any> {
  const { teamId, sort: { players } } = action

  yield put(fetchPlayers({ filter: { teamId }, sort: players }))
}

function * fetchTeamFixtures (action) : Generator<any, any, any> {
  const { teamId, sort: { fixtures } } = action

  const url = `${API_URL}${TEAMS_URL}/${teamId}/fixtures?${stringify({ sort: fixtures })}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_TEAMS_FIXTURES_INDEX),
    failureAction: failure(actions.API_TEAMS_FIXTURES_INDEX)
  })
}

function * updateTeamPlayersSort (action) : Generator<any, any, any> {
  const { tab, sort } = action
  const { data: { id: teamId } } = yield select(state => state.team)

  const query = {
    sort: {
      players: sort
    }
  }

  yield history.push(`${TEAMS_URL}/${teamId}/${tab}?${qs.stringify(query)}`)
}

function * updateTeamFixturesSort (action) : Generator<any, any, any> {
  const { tab, sort } = action
  const { sort: defaultSort, data: { id: teamId } } = yield select(state => state.team)

  const query = {
    sort: {
      fixtures: sort
    }
  }

  yield history.push(`${TEAMS_URL}/${teamId}/${tab}?${qs.stringify(query)}`)
}

function * fetchTeam (action) : Generator<any, any, any> {
  const { teamId } = action

  const url = `${API_URL}${TEAMS_URL}/${teamId}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_TEAMS_SHOW),
    failureAction: failure(actions.API_TEAMS_SHOW)
  })
}

export default function * teamSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_TEAMS_SHOW, fetchTeam),
    yield takeLatest(actions.API_TEAMS_FIXTURES_INDEX, fetchTeamFixtures),
    yield takeLatest(actions.FETCH_TEAM_PLAYERS, fetchTeamPlayers),
    yield takeLatest(actions.UPDATE_TEAM_PLAYERS_SORT, updateTeamPlayersSort),
    yield takeLatest(actions.UPDATE_TEAM_FIXTURES_SORT, updateTeamFixturesSort)
  ])
}
