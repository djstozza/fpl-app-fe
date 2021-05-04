import { fork, all, takeLatest, put } from 'redux-saga/effects'

import { authSagas } from './auth'
import { playerSagas } from './player'
import { playersSagas } from './players'
import { requestSagas } from './request'
import { roundSagas } from './round'
import { roundsSagas } from './rounds'
import { teamSagas } from './team'
import { teamsSagas } from './teams'

export default function * rootSaga () : Generator<any, any, any> {
  yield all([
    fork(authSagas),
    fork(playerSagas),
    fork(playersSagas),
    fork(requestSagas),
    fork(roundSagas),
    fork(roundsSagas),
    fork(teamSagas),
    fork(teamsSagas)
  ])
}
