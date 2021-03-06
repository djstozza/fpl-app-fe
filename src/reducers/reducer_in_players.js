import { FETCH_ALL_TRADEABLE_PLAYERS } from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case FETCH_ALL_TRADEABLE_PLAYERS:
      return action.payload;

    default:
      return state;
  }
}
