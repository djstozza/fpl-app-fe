import { combineReducers } from '@reduxjs/toolkit'

import auth from './auth'
import draftPicks from './draftPicks'
import fplTeam from './fplTeam'
import fplTeams from './fplTeams'
import fplTeamList from './fplTeamList'
import fplTeamLists from './fplTeamLists'
import interTeamTradeGroup from './interTeamTradeGroup'
import interTeamTradeGroups from './interTeamTradeGroups'
import league from './league'
import leagues from './leagues'
import listPosition from './listPosition'
import miniDraftPicks from './miniDraftPicks'
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
  fplTeam,
  fplTeams,
  fplTeamList,
  fplTeamLists,
  interTeamTradeGroup,
  interTeamTradeGroups,
  league,
  leagues,
  listPosition,
  miniDraftPicks,
  player,
  players,
  request,
  round,
  rounds,
  team,
  teams,
  trades,
  waiverPicks
})

export default rootReducer
