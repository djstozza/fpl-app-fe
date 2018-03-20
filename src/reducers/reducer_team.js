import { FETCH_TEAM, SHOW_TEAM_ERRORS } from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case FETCH_TEAM:
      return action.payload;
    case SHOW_TEAM_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
