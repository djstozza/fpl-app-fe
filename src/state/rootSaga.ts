import { fork, all } from 'redux-saga/effects'

import { authSagas } from './auth'
import { draftPicksSagas } from './draftPicks'
import { interTeamTradeGroupsSagas } from './interTeamTradeGroups'

export default function * rootSaga () : Generator<any, any, any> {
  yield all([
    fork(authSagas),
    fork(draftPicksSagas),
    fork(interTeamTradeGroupsSagas)
  ])
}
