import { FETCH_FPL_TEAMS, FETCH_FPL_TEAM, UPDATE_FPL_TEAM, SHOW_FPL_TEAM_ERRORS } from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case FETCH_FPL_TEAMS:
      return action.payload;
    case FETCH_FPL_TEAM:
      return action.payload;
    case UPDATE_FPL_TEAM:
      return action.payload;
    case SHOW_FPL_TEAM_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
