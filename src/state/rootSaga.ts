import { fork, all } from 'redux-saga/effects'

import { authSagas } from './auth'
import { draftPicksSagas } from './draftPicks'
import { fplTeamSagas } from './fplTeam'
import { fplTeamsSagas } from './fplTeams'
import { fplTeamListSagas } from './fplTeamList'
import { fplTeamListsSagas } from './fplTeamLists'
import { leagueSagas } from './league'
import { leaguesSagas } from './leagues'
import { listPositionSagas } from './listPosition'
import { playerSagas } from './player'
import { playersSagas } from './players'
import { requestSagas } from './request'
import { roundSagas } from './round'
import { roundsSagas } from './rounds'
import { teamSagas } from './team'
import { teamsSagas } from './teams'
import { waiverPicksSagas } from './waiverPicks'

export default function * rootSaga () : Generator<any, any, any> {
  yield all([
    fork(authSagas),
    fork(draftPicksSagas),
    fork(fplTeamSagas),
    fork(fplTeamsSagas),
    fork(fplTeamListSagas),
    fork(fplTeamListsSagas),
    fork(leagueSagas),
    fork(leaguesSagas),
    fork(listPositionSagas),
    fork(playerSagas),
    fork(playersSagas),
    fork(requestSagas),
    fork(roundSagas),
    fork(roundsSagas),
    fork(teamSagas),
    fork(teamsSagas),
    fork(waiverPicksSagas)
  ])
}
