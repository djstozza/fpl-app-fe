import { put, takeLatest, all, select } from 'redux-saga/effects'
import qs from 'qs'
import { stringify } from 'utilities/helpers'

import { API_URL, PLAYERS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'

function * fetchPlayers (action) : Generator<any, any, any> {
  const { sort, filter, page } = action

  const url = `${API_URL}${PLAYERS_URL}?${stringify({ sort, filter, page })}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_PLAYERS_INDEX),
    failureAction: failure(actions.API_PLAYERS_INDEX)
  })
}

function * fetchFacets (action) : Generator<any, any, any> {
  const url = `${API_URL}${PLAYERS_URL}/facets`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_PLAYERS_FACETS_INDEX),
    failureAction: failure(actions.API_PLAYERS_FACETS_INDEX)
  })
}

function * updateFilter (action) : Generator<any, any, any> {
  const { filter } = action
  const { sort, page } = yield select(state => state.players)

  const query = {
    filter,
    sort,
    page: {
      ...page,
      offset: 0
    }
  }

  yield history.push(`${PLAYERS_URL}?${qs.stringify(query)}`)
}

function * updateSort (action) : Generator<any, any, any> {
  const { sort } = action
  const { filter, page } = yield select(state => state.players)

  const query = { filter, sort, page }

  yield history.push(`${PLAYERS_URL}?${qs.stringify(query)}`)
}

function * updatePage (action) : Generator<any, any, any> {
  const { offset } = action
  const { filter, sort, page } = yield select(state => state.players)

  const query = {
    filter,
    sort,
    page: {
      ...page,
      offset
    }
  }

  yield history.push(`${PLAYERS_URL}?${qs.stringify(query)}`)
}

export default function * playersSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest([actions.API_PLAYERS_INDEX], fetchPlayers),
    yield takeLatest([actions.API_PLAYERS_FACETS_INDEX], fetchFacets),
    yield takeLatest([actions.UPDATE_PLAYERS_FILTER], updateFilter),
    yield takeLatest([actions.UPDATE_PLAYERS_SORT], updateSort),
    yield takeLatest([actions.UPDATE_PLAYERS_PAGE], updatePage)
  ])
}
