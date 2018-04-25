import { FETCH_FPL_TEAMS } from '../types';
import axios from 'axios';
import { API_ROOT,  getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function fetchFplTeams () {
  return dispatch => {
    axios.get(`${API_ROOT}/fpl_teams.json`, getLocalStorageHeader()).then(res => {
      setLocalStorageHeader(res);
      dispatch(fetchFplTeamsAsync(res.data));
    });
  }
}

function fetchFplTeamsAsync (data) {
  return {
    type: FETCH_FPL_TEAMS,
    payload: data
  };
}
