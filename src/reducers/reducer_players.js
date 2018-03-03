import { FETCH_TEAM_PLAYERS, FETCH_PLAYERS } from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case FETCH_TEAM_PLAYERS:
      return action.payload;
    case FETCH_PLAYERS:
      return action.payload;

    default:
      return state;
  }
}
