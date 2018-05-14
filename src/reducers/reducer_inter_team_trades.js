import {
  CREATE_INTER_TEAM_TRADE_GROUP,
  FETCH_INTER_TEAM_TRADE_GROUPS,
  UPDATE_INTER_TEAM_TRADE_GROUP,
  SHOW_INTER_TEAM_TRADE_GROUP_ERRORS,
} from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case CREATE_INTER_TEAM_TRADE_GROUP:
      return action.payload;
    case FETCH_INTER_TEAM_TRADE_GROUPS:
      return action.payload;
    case UPDATE_INTER_TEAM_TRADE_GROUP:
      return action.payload;
    case SHOW_INTER_TEAM_TRADE_GROUP_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
