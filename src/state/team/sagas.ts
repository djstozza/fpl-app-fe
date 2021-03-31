import { put, takeLatest, takeEvery, all, fork, select } from 'redux-saga/effects'
import qs from 'qs'

import { API_URL, TEAMS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import { fetchPlayers } from 'state/players/actions'
import history from 'state/history'

function * fetchTeamPlayers (action) : Generator<any, any, any> {
  const { teamId, sort } = action
  const { players } = sort

  const { sort: stateSort } = yield select((state) => (state.team))

  const query = {
    sort: {
      ...stateSort,
      players
    }
  }

  history.push(`${TEAMS_URL}/${teamId}?${qs.stringify(query)}`)

  yield put(fetchPlayers({ filter: { teamId }, sort: players }))
}

function * fetchTeam (action) : Generator<any, any, any> {
  const { teamId } = action
  const url = `${API_URL}${TEAMS_URL}/${teamId}`

  history.push(`${TEAMS_URL}/${teamId}`)

  yield all([
    yield put({
      type: requestActions.UNAUTHED_REQUEST,
      method: 'GET',
      url,
      successAction: success(actions.API_TEAMS_SHOW),
      failureAction: failure(actions.API_TEAMS_SHOW)
    })
  ])
}

export default function * teamSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_TEAMS_SHOW, fetchTeam),
    yield takeLatest(actions.FETCH_TEAM_PLAYERS, fetchTeamPlayers)
  ])
}
