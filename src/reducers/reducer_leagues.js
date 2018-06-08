import {
  CREATE_LEAGUE,
  EDIT_LEAGUE,
  UPDATE_LEAGUE,
  JOIN_LEAGUE,
  FETCH_LEAGUE,
  FETCH_LEAGUE_FPL_TEAMS,
  GENERATE_PICK_NUMBERS,
  UPDATE_DRAFT_PICK_ORDER,
  CREATE_DRAFT,
  FETCH_UNPICKED_PLAYERS,
  SHOW_LEAGUE_ERRORS
} from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case FETCH_LEAGUE:
      return action.payload;
    case FETCH_LEAGUE_FPL_TEAMS:
      return action.payload;
    case CREATE_LEAGUE:
      return action.payload;
    case EDIT_LEAGUE:
      return action.payload;
    case UPDATE_LEAGUE:
      return action.payload;
    case JOIN_LEAGUE:
      return action.payload;
    case GENERATE_PICK_NUMBERS:
      return action.payload;
    case CREATE_DRAFT:
      return action.payload;
    case UPDATE_DRAFT_PICK_ORDER:
      return action.payload;
    case FETCH_UNPICKED_PLAYERS:
      return action.payload;
    case SHOW_LEAGUE_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
