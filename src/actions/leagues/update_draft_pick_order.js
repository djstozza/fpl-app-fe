import { UPDATE_DRAFT_PICK_ORDER, SHOW_LEAGUE_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config.js';

export default function updateDraftPickOrder (leagueId, fplTeamId, pickNumber) {
  return dispatch => {
    axios({
      url: `${API_ROOT}/leagues/${leagueId}/fpl_teams/${fplTeamId}.json`,
      method: 'PUT',
      data: { draft_pick_number: pickNumber },
      ...getLocalStorageHeader(),
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(updateDraftPickOrderAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_LEAGUE_ERRORS, payload: { error: error.response } });
    });
  }
}

function updateDraftPickOrderAsync (data) {
  return {
    type: UPDATE_DRAFT_PICK_ORDER,
    payload: data
  };
}
