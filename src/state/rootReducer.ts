import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

import auth from './auth'
import draftPicks from './draftPicks'
import fplTeam from './fplTeam'
import fplTeams from './fplTeams'
import fplTeamList from './fplTeamList'
import fplTeamLists from './fplTeamLists'
import interTeamTradeGroups from './interTeamTradeGroups'
import league from './league'
import leagues from './leagues'
import listPosition from './listPosition'
import player from './player'
import players from './players'
import request from './request'
import round from './round'
import rounds from './rounds'
import team from './team'
import teams from './teams'
import trades from './trades'
import waiverPicks from './waiverPicks'

const rootReducer = combineReducers({
  auth,
  draftPicks,
  interTeamTradeGroups,
  fplTeam,
  fplTeams,
  fplTeamList,
  fplTeamLists,
  league,
  leagues,
  listPosition,
  player,
  players,
  request,
  round,
  rounds,
  team,
  teams,
  trades,
  waiverPicks,
  loadingBar: loadingBarReducer
})

export default rootReducer
