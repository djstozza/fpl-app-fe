import { NEW_INTER_TEAM_TRADE_GROUP } from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case NEW_INTER_TEAM_TRADE_GROUP:
      return action.payload;

    default:
      return state;
  }
}
