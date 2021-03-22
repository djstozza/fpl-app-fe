import { fork, all, takeLatest, put } from 'redux-saga/effects'
import { roundSagas } from './round'
import { roundsSagas } from './rounds'
import { requestSagas } from './request'
import { teamsSagas } from './teams'
import { teamSagas } from './team'


export default function * rootSaga () : Generator<any, any, any> {
  yield all([
    fork(requestSagas),
    fork(roundSagas),
    fork(roundsSagas),
    fork(teamsSagas),
    fork(teamSagas)
  ])
}
