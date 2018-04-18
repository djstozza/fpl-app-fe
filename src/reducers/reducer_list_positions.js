import { FETCH_LIST_POSITION, SHOW_LIST_POSITION_ERRORS } from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case FETCH_LIST_POSITION:
      return action.payload;
    case SHOW_LIST_POSITION_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
