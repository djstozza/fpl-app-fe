import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import RoundsReducer from './reducer_rounds';
import RoundReducer from './reducer_round';
import TeamsReducer from './reducer_teams';
import TeamReducer from './reducer_team';
import PlayersReducer from './reducer_players';
import PositionsReducer from './reducer_positions';

const rootReducer = combineReducers({
  RoundsReducer: RoundsReducer,
  RoundReducer: RoundReducer,
  TeamsReducer: TeamsReducer,
  TeamReducer: TeamReducer,
  PlayersReducer: PlayersReducer,
  PositionsReducer: PositionsReducer,
  router: routerReducer
});

export default rootReducer;
