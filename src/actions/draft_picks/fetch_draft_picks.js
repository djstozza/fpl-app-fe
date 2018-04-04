import { FETCH_DRAFT_PICKS, SHOW_LEAGUE_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config.js';

export default function fetchDraftPicks (leagueId) {
  return dispatch => {
    axios.get(`${API_ROOT}/leagues/${leagueId}/draft_picks.json`).then(res => {
      dispatch(fetchDraftPicksAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_LEAGUE_ERRORS, payload: { error: error.response } });
    });
  }
}

function fetchDraftPicksAsync (data) {
  return {
    type: FETCH_DRAFT_PICKS,
    payload: data
  };
}
