import { FETCH_TEAM_PLAYERS, FETCH_PLAYERS, FETCH_PLAYER, SHOW_PLAYER_ERRORS } from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case FETCH_TEAM_PLAYERS:
      return action.payload;
    case FETCH_PLAYERS:
      return action.payload;
    case FETCH_PLAYER:
      return action.payload;
    case SHOW_PLAYER_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
