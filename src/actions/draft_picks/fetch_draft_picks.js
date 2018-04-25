import { FETCH_DRAFT_PICKS, SHOW_DRAFT_PICK_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function fetchDraftPicks (leagueId) {
  return dispatch => {
    axios.get(`${API_ROOT}/leagues/${leagueId}/draft_picks.json`, getLocalStorageHeader()).then(res => {
      setLocalStorageHeader(res);
      dispatch(fetchDraftPicksAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_DRAFT_PICK_ERRORS, payload: { error: error.response } });
    });
  }
}

function fetchDraftPicksAsync (data) {
  return {
    type: FETCH_DRAFT_PICKS,
    payload: data
  };
}
