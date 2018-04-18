import { FETCH_FPL_TEAM_LIST, SHOW_FPL_TEAM_LIST_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config.js';

export default function fetchFplTeamList (fplTeamId) {
  return dispatch => {
    axios.get(`${API_ROOT}/fpl_teams/${fplTeamId}/fpl_team_lists.json`).then(res => {
      dispatch(fetchFplTeamListAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_FPL_TEAM_LIST_ERRORS, payload: { error: error.response } });
    });
  }
}

function fetchFplTeamListAsync (data) {
  return {
    type: FETCH_FPL_TEAM_LIST,
    payload: data
  };
}
