import { put, takeLatest, takeEvery, all, fork, select } from 'redux-saga/effects'
import qs from 'qs'

import { API_URL, TEAMS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import { fetchPlayers } from 'state/players/actions'
import { decamelizeKeys } from 'humps'
import history from 'state/history'

function * updateSort (action): Generator<any, any, any> {
  const { teamId, tab, newSort = {} } = action
  const { sort: oldSort } =  yield select((state) => (state.team))

  const sort = {
    ...oldSort,
    ...newSort
  }

  const query = {
    sort
  }

  history.push(`${TEAMS_URL}/${teamId}/${tab}?${qs.stringify(query)}`)

  yield put({ type: actions.UPDATE_SORT, sort })
}

function * fetchTeamPlayers (action) : Generator<any, any, any> {
  const { teamId, tab, playersSortParams } = action

  yield all([
    yield put(fetchPlayers({ filter: { teamId }, sort: playersSortParams })),
    yield updateSort({ teamId, tab, newSort: { players: playersSortParams } })
  ])
}

function * fetchTeamFixtures (action) : Generator<any, any, any> {
  const { teamId, tab, fixturesSortParams } = action

  const { sort } = yield select((state) => (state.team))

  const query = {
    sort: {
      ...sort,
      fixtures: fixturesSortParams
    }
  }

  const url = `${API_URL}${TEAMS_URL}/${teamId}/fixtures?${qs.stringify(decamelizeKeys({ sort: fixturesSortParams }))}`

  yield all([
    yield put({
      type: requestActions.UNAUTHED_REQUEST,
      method: 'GET',
      url,
      successAction: success(actions.API_TEAMS_FIXTURES_INDEX),
      failureAction: failure(actions.API_TEAMS_FIXTURES_INDEX)
    }),
    yield updateSort({ teamId, tab, newSort: { fixtures: fixturesSortParams } })
  ])

}

function * fetchTeam (action) : Generator<any, any, any> {
  const { teamId, tab, sort } = action
  const url = `${API_URL}${TEAMS_URL}/${teamId}`

  history.push(`${TEAMS_URL}/${teamId}/${tab}`)

  yield all([
    yield put({
      type: requestActions.UNAUTHED_REQUEST,
      method: 'GET',
      url,
      successAction: success(actions.API_TEAMS_SHOW),
      failureAction: failure(actions.API_TEAMS_SHOW)
    }),
    yield updateSort({ teamId, tab, newSort: sort })
  ])
}

export default function * teamSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_TEAMS_SHOW, fetchTeam),
    yield takeLatest(actions.API_TEAMS_FIXTURES_INDEX, fetchTeamFixtures),
    yield takeLatest(actions.FETCH_TEAM_PLAYERS, fetchTeamPlayers)
  ])
}
