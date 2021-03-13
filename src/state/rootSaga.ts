import { fork, all, takeLatest, put } from 'redux-saga/effects'
import { roundSagas } from './round'
import { roundsSagas } from './rounds'
import { requestSagas } from './request'


export default function * rootSaga () : Generator<any, any, any> {
  yield all([
    fork(roundSagas),
    fork(roundsSagas),
    fork(requestSagas)
  ])
}
