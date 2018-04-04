import { FETCH_DRAFT_PICKS, UPDATE_DRAFT_PICK, SHOW_DRAFT_PICK_ERRORS } from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case FETCH_DRAFT_PICKS:
      return action.payload;
    case UPDATE_DRAFT_PICK:
      return action.payload;
    case SHOW_DRAFT_PICK_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
