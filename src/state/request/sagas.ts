import { call, put, takeEvery, all, fork, select } from 'redux-saga/effects'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import humps from 'lodash-humps'

import * as actions from './actions'
import { getData } from '../../api'

function * sendRequest (needsAuth, action) : Generator<any, any, any> {
  const { method, url, successAction, failureAction, body, redirect, notification } = action
  try {
    if (!action.hideLoading) {
      const isLoadingBarShowing = yield select(state =>
        state.loadingBar.default ? state.loadingBar.default !== 0 : false)
      if (!isLoadingBarShowing) {
        yield put(showLoading())
      }
    }

    const options = { method, body }
    const response = yield call(getData, url, options)
    const { ok, body: result } = response

    if (!ok || result.errors) {
      yield put({ type: actions.REQUEST_FAIL, failureAction, url, response })
    } else {
      yield put({ type: successAction, ...humps(result), redirect, notification })
    }
  } catch (e) {
    yield put({ type: failureAction, errors: [humps(e)] })
    yield put({ type: actions.ADD_REQUEST_ERROR, error: { url, status: 'failed_to_fetch' } })
  } finally {
    yield put({ type: actions.REQUEST_DONE })
  }
}

function * requestFail (action: any): Generator<any, any, any> {
  const {
    url,
    failureAction,
    response: { status, statusText, body }
  } = action
  const errors = humps(body.errors || [])

  yield put({ type: failureAction, status, errors })
  yield put({ type: actions.ADD_REQUEST_ERROR, error: { url, status, statusText, errors } })
}

function * requestDone (action) : Generator<any, any, any> {
  const inFlightRequestsNum = yield select(state => state.request.inFlight)
  if (inFlightRequestsNum < 1) {
    yield put(hideLoading())
  }
}

function * watchAuthRequests () : Generator<any, any, any> {
  yield takeEvery(actions.AUTHED_REQUEST, sendRequest, true)
}

function * watchUnauthRequests () : Generator<any, any, any> {
  yield takeEvery(actions.UNAUTHED_REQUEST, sendRequest, false)
}

function * watchRequestDone () : Generator<any, any, any> {
  yield takeEvery(actions.REQUEST_DONE, requestDone)
}

function * watchRequestFail () : Generator<any, any, any> {
  yield takeEvery(actions.REQUEST_FAIL, requestFail)
}

export default function * requestSagas () : Generator<any, any, any> {
  yield all([
    fork(watchAuthRequests),
    fork(watchUnauthRequests),
    fork(watchRequestDone),
    fork(watchRequestFail)
  ])
}
