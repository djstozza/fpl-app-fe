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
import FplTeamsReducer from './reducer_fpl_teams';
import FplTeamListsReducer from './reducer_fpl_team_lists';
import ListPositionsReducer from './reducer_list_positions';
import WaiverPicksReducer from './reducer_waiver_picks';
import TradeablePlayersReducer from './reducer_tradeable_players';
import InPlayersReducer from './reducer_in_players';
import InterTeamTradesReducer from './reducer_inter_team_trades';
import MiniDraftPicksReducer from './reducer_mini_draft_picks';
import CurrentRoundReducer from './reducer_current_round';

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
  FplTeamsReducer: FplTeamsReducer,
  FplTeamListsReducer: FplTeamListsReducer,
  ListPositionsReducer: ListPositionsReducer,
  WaiverPicksReducer: WaiverPicksReducer,
  TradeablePlayersReducer: TradeablePlayersReducer,
  InPlayersReducer: InPlayersReducer,
  InterTeamTradesReducer: InterTeamTradesReducer,
  MiniDraftPicksReducer: MiniDraftPicksReducer,
  CurrentRoundReducer: CurrentRoundReducer,
  router: routerReducer
});

export default rootReducer;
