import { FETCH_ROUND, SHOW_ROUND_ERRORS } from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case FETCH_ROUND:
      return action.payload;
    case SHOW_ROUND_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
