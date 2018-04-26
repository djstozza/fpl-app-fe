import {
  FETCH_FPL_TEAM_LIST,
  UPDATE_FPL_TEAM_LIST_ORDER,
  TRADE_PLAYER,
  SHOW_FPL_TEAM_LIST_ERRORS
} from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case FETCH_FPL_TEAM_LIST:
      return action.payload;
    case UPDATE_FPL_TEAM_LIST_ORDER:
      return action.payload;
    case TRADE_PLAYER:
      return action.payload;
    case SHOW_FPL_TEAM_LIST_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
