import { fork, all } from 'redux-saga/effects'

import { authSagas } from './auth'
import { draftPicksSagas } from './draftPicks'
import { fplTeamListSagas } from './fplTeamList'
import { interTeamTradeGroupsSagas } from './interTeamTradeGroups'
import { leagueSagas } from './league'
import { leaguesSagas } from './leagues'
import { listPositionSagas } from './listPosition'
import { miniDraftPicksSagas } from './miniDraftPicks'
import { playerSagas } from './player'
import { playersSagas } from './players'
import { tradesSagas } from './trades'
import { waiverPicksSagas } from './waiverPicks'

export default function * rootSaga () : Generator<any, any, any> {
  yield all([
    fork(authSagas),
    fork(draftPicksSagas),
    fork(fplTeamListSagas),
    fork(interTeamTradeGroupsSagas),
    fork(leagueSagas),
    fork(leaguesSagas),
    fork(listPositionSagas),
    fork(playerSagas),
    fork(playersSagas),
    fork(miniDraftPicksSagas),
    fork(tradesSagas),
    fork(waiverPicksSagas)
  ])
}
