import { FETCH_ALL_TRADEABLE_PLAYERS } from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case FETCH_ALL_TRADEABLE_PLAYERS:
      console.log(action.payload)
      return action.payload;

    default:
      return state;
  }
}
