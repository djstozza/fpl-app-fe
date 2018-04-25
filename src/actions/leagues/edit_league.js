import { EDIT_LEAGUE, SHOW_LEAGUE_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function fetchLeague (leagueId) {
  return dispatch => {
    axios.get(`${API_ROOT}/leagues/${leagueId}/edit.json`, getLocalStorageHeader()).then(res => {
      setLocalStorageHeader(res);
      dispatch(fetchLeagueAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_LEAGUE_ERRORS, payload: { error: error.response } });
    });
  }
}

function fetchLeagueAsync (data) {
  return {
    type: EDIT_LEAGUE,
    payload: data
  };
}
