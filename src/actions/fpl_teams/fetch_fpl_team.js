import { FETCH_FPL_TEAM, SHOW_FPL_TEAM_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function fetchFplTeam (fplTeamId) {
  return dispatch => {
    axios.get(`${API_ROOT}/fpl_teams/${fplTeamId}.json`, getLocalStorageHeader()).then(res => {
      setLocalStorageHeader(res);
      dispatch(fetchFplTeamAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_FPL_TEAM_ERRORS, payload: { error: error.response } });
    });
  }
}

function fetchFplTeamAsync (data) {
  return {
    type: FETCH_FPL_TEAM,
    payload: data
  };
}
