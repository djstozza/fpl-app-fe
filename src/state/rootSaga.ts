import { fork, all } from 'redux-saga/effects'

import { authSagas } from './auth'
import { draftPicksSagas } from './draftPicks'
import { leagueSagas } from './league'
import { leaguesSagas } from './leagues'
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
    fork(draftPicksSagas),
    fork(leagueSagas),
    fork(leaguesSagas),
    fork(playerSagas),
    fork(playersSagas),
    fork(requestSagas),
    fork(roundSagas),
    fork(roundsSagas),
    fork(teamSagas),
    fork(teamsSagas)
  ])
}
