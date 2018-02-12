import { combineReducers } from 'redux';
import RoundsReducer from './reducer_rounds';
import RoundReducer from './reducer_round';
import TeamsReducer from './reducer_teams';

const rootReducer = combineReducers({
  RoundsReducer: RoundsReducer,
  RoundReducer: RoundReducer,
  TeamsReducer: TeamsReducer,
});

export default rootReducer;
