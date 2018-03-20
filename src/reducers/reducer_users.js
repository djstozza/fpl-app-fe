import { SIGN_UP, VALIDATE_TOKEN, PROFILE, LOG_IN, LOG_OUT, SHOW_USER_ERRORS } from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case SIGN_UP:
      return action.payload;
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      console.log(action.payload);
      return action.payload;
    case PROFILE:
      return action.payload;
    case VALIDATE_TOKEN:
      return action.payload;
    case SHOW_USER_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
