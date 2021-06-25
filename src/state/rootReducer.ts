import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

import auth from './auth'
import draftPicks from './draftPicks'
import fplTeam from './fplTeam'
import fplTeams from './fplTeams'
import league from './league'
import leagues from './leagues'
import player from './player'
import players from './players'
import request from './request'
import round from './round'
import rounds from './rounds'
import team from './team'
import teams from './teams'


const rootReducer = combineReducers({
  auth,
  draftPicks,
  fplTeam,
  fplTeams,
  league,
  leagues,
  player,
  players,
  request,
  round,
  rounds,
  team,
  teams,
  loadingBar: loadingBarReducer
})

export default rootReducer
