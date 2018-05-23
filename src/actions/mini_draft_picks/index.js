import { FETCH_MINI_DRAFT_PICKS, SHOW_MINI_DRAFT_PICK_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function fetchMiniDraftPicks (leagueId) {
  return dispatch => {
    axios.get(`${API_ROOT}/leagues/${leagueId}/mini_draft_picks.json`, getLocalStorageHeader()).then(res => {
      setLocalStorageHeader(res);
      dispatch(fetchMiniDraftPicksAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_MINI_DRAFT_PICK_ERRORS, payload: { error: error.response } });
    });
  }
}

function fetchMiniDraftPicksAsync (data) {
  return {
    type: FETCH_MINI_DRAFT_PICKS,
    payload: data
  };
}
