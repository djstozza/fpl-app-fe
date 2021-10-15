import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { camelizeKeys } from 'humps'

import * as actions from './actions'
import { getData } from '../../api'

import type { Options } from '../../api'

export function * sendRequest (needsAuth, action) : Generator<any, any, any> {
  const { method, url, successAction, failureAction, body, redirect, notification, hideLoading } = action

  try {
    if (!hideLoading) {
      const isLoadingBarShowing = yield select(state => state.loadingBar.default !== 0)
      if (!isLoadingBarShowing) {
        yield put(showLoading())
      }
    }

    const options: Options = { method, body }

    if (needsAuth) {
      const token = yield select(state => state.auth.token)
      options.token = token
    }

    const response = yield call(getData, url, options)
    const { ok, body: result } = response

    if (!ok || result.errors) {
      yield put({ type: actions.REQUEST_FAIL, failureAction, url, response })
    } else {
      yield put({ type: successAction, ...camelizeKeys(result), redirect, notification })
    }
  } catch (e) {
    console.log(e)
    yield put({ type: failureAction, errors: [camelizeKeys(e)] })
    yield put({ type: actions.ADD_REQUEST_ERROR, error: { url, status: 'failed_to_fetch' } })
  } finally {
    yield put({ type: actions.REQUEST_DONE })
  }
}

export function * requestFail (action: any): Generator<any, any, any> {
  const {
    url,
    failureAction,
    response: { status, statusText, body }
  } = action

  const errors = camelizeKeys(body.errors || [])

  yield put({ type: failureAction, status, errors })
  yield put({ type: actions.ADD_REQUEST_ERROR, error: { url, status, statusText, errors } })
}

export function * requestDone () : Generator<any, any, any> {
  const inFlightRequestsNum = yield select(state => state.request.inFlight)
  if (inFlightRequestsNum < 1) yield put(hideLoading())
}

export default function * requestSagas () : Generator<any, any, any> {
  yield all([
    takeEvery(actions.AUTHED_REQUEST, sendRequest, true),
    takeEvery(actions.UNAUTHED_REQUEST, sendRequest, false),
    takeEvery(actions.REQUEST_DONE, requestDone),
    takeEvery(actions.REQUEST_FAIL, requestFail)
  ])
}
