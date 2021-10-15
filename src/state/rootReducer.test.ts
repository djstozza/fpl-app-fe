import rootReducer from './rootReducer'
import * as authActions from './auth/actions'

import { initialState as authInitialState } from './auth/reducer'
import { initialState as draftPicksInitialState } from './draftPicks/reducer'
import { initialState as fplTeamInitialState } from './fplTeam/reducer'
import { initialState as fplTeamListInitialState } from './fplTeamList/reducer'
import { initialState as fplTeamListsInitialState } from './fplTeamLists/reducer'
import { initialState as fplTeamsInitialState } from './fplTeams/reducer'
import { initialState as interTeamTradeGroupInitialState } from './interTeamTradeGroup/reducer'
import { initialState as interTeamTradeGroupsInitialState } from './interTeamTradeGroups/reducer'
import { initialState as leagueInitialState } from './league/reducer'
import { initialState as leaguesInitialState } from './leagues/reducer'
import { initialState as listPositionInitialState } from './listPosition/reducer'
import { initialState as miniDraftPicksInitialState } from './miniDraftPicks/reducer'
import { initialState as playerInitialState } from './player/reducer'
import { initialState as playersInitialState } from './players/reducer'
import { initialState as requestInitialState } from './request/reducer'
import { initialState as roundInitialState } from './round/reducer'
import { initialState as roundsInitialState } from './rounds/reducer'
import { initialState as teamInitialState } from './team/reducer'
import { initialState as teamsInitialState } from './teams/reducer'
import { initialState as tradesInitialState } from './trades/reducer'
import { initialState as waiverPicksInitialState } from './waiverPicks/reducer'
import { loadingBarReducer } from 'react-redux-loading-bar'

import { USER_1 } from 'test/fixtures'

describe('Root reducer', () => {
  const blankAppState = {
    auth: authInitialState,
    draftPicks: draftPicksInitialState,
    fplTeam: fplTeamInitialState,
    fplTeamList: fplTeamListInitialState,
    fplTeamLists: fplTeamListsInitialState,
    fplTeams: fplTeamsInitialState,
    interTeamTradeGroup: interTeamTradeGroupInitialState,
    interTeamTradeGroups: interTeamTradeGroupsInitialState,
    league: leagueInitialState,
    leagues: leaguesInitialState,
    listPosition: listPositionInitialState,
    miniDraftPicks: miniDraftPicksInitialState,
    player: playerInitialState,
    players: playersInitialState,
    request: requestInitialState,
    round: roundInitialState,
    rounds: roundsInitialState,
    team: teamInitialState,
    teams: teamsInitialState,
    trades: tradesInitialState,
    waiverPicks: waiverPicksInitialState,
    loadingBar: loadingBarReducer
  }
  const exampleLoggedInState = {
    ...blankAppState,
    auth: {
      user: USER_1,
      token: 'fake_token'
    }
  }

  it('Clears application state on logout', () => {
    expect(rootReducer(exampleLoggedInState, {
      type: authActions.LOG_OUT
    })).toEqual(blankAppState)
  })
})
