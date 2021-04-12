import { put, takeLatest, takeEvery, all, fork, select } from 'redux-saga/effects'
import qs from 'qs'

import { API_URL, TEAMS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import { fetchPlayers } from 'state/players/actions'
import history from 'state/history'
import { stringify } from 'utilities/helpers'

function * updateTeamQuery (action) : Generator<any, any, any> {
  const { tab, newSort, method = 'push' } = action

  const { sort: oldSort, data: { id: teamId } } =  yield select((state) => (state.team))

  const sort = {
    ...oldSort,
    ...newSort
  }

  const query = {
    sort
  }

  history[method](`${TEAMS_URL}/${teamId}/${tab}?${qs.stringify(query)}`)

  yield put({ type: actions.UPDATE_SORT, sort })
}

function * fetchTeamPlayers (action) : Generator<any, any, any> {
  const { teamId, tab, playersSortParams, method } = action

  yield put(fetchPlayers({ filter: { teamId }, sort: playersSortParams, updateUrl: false }))
  yield updateTeamQuery({ newSort: { players: playersSortParams }, tab, method: 'replace' })
}

function * fetchTeamFixtures (action) : Generator<any, any, any> {
  const { teamId, tab, fixturesSortParams, method } = action

  const url = `${API_URL}${TEAMS_URL}/${teamId}/fixtures?${stringify({ sort: fixturesSortParams })}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_TEAMS_FIXTURES_INDEX),
    failureAction: failure(actions.API_TEAMS_FIXTURES_INDEX)
  })
  yield updateTeamQuery({ newSort: { fixtures: fixturesSortParams }, tab, method: 'replace' })
}

function * fetchTeam (action) : Generator<any, any, any> {
  const { teamId, tab, sort } = action

  const query = { sort }

  history.replace(`${TEAMS_URL}/${teamId}/${tab}?${qs.stringify(query)}`)

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
    yield takeLatest(actions.UPDATE_TEAM_QUERY, updateTeamQuery)
  ])
}
