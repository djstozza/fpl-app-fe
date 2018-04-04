import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import RoundsReducer from './reducer_rounds';
import RoundReducer from './reducer_round';
import TeamsReducer from './reducer_teams';
import TeamReducer from './reducer_team';
import PlayersReducer from './reducer_players';
import PositionsReducer from './reducer_positions';
import UsersReducer from './reducer_users';
import LeaguesReducer from './reducer_leagues';
import DraftPicksReducer from './reducer_draft_picks';

const rootReducer = combineReducers({
  RoundsReducer: RoundsReducer,
  RoundReducer: RoundReducer,
  TeamsReducer: TeamsReducer,
  TeamReducer: TeamReducer,
  PlayersReducer: PlayersReducer,
  PositionsReducer: PositionsReducer,
  UsersReducer: UsersReducer,
  LeaguesReducer: LeaguesReducer,
  DraftPicksReducer: DraftPicksReducer,
  router: routerReducer
});

export default rootReducer;
