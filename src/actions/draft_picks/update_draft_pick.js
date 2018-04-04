import { UPDATE_DRAFT_PICK, SHOW_LEAGUE_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config.js';

export default function updateDraftPick (leagueId, draftPickId, playerId, miniDraft) {
  return dispatch => {
    axios({
      url: `${API_ROOT}/leagues/${leagueId}/draft_picks/${draftPickId}.json`,
      method: 'PUT',
      data: {
        player_id: playerId,
        mini_draft: miniDraft,
      },
      ...getLocalStorageHeader(),
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(updateDraftPickAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_LEAGUE_ERRORS, payload: { error: error.response } });
    });
  }
}

function updateDraftPickAsync (data) {
  return {
    type: UPDATE_DRAFT_PICK,
    payload: data
  };
}
