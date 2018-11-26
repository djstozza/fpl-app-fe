import { UPDATE_DRAFT_PICK, SHOW_DRAFT_PICK_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function updateDraftPick (leagueId, draftPickId, playerId, miniDraft) {
  return dispatch => {
    axios({
      url: `${ API_ROOT }/leagues/${ leagueId }/draft_picks/${ draftPickId }.json`,
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
      const errorResponse = error.response;
      const errorData = errorResponse.data;
      setLocalStorageHeader(error.response);
      dispatch({
        type: SHOW_DRAFT_PICK_ERRORS,
        payload: {
          error: errorResponse,
          draft_picks: errorData.draft_picks,
          fpl_team: errorData.fpl_team,
          mini_draft_picked: errorData.mini_draft_picked,
          all_players_picked: errorData.all_players_picked,
          current_draft_pick: errorData.current_draft_pick,
          current_draft_pick_user: errorData.current_draft_pick_user,
          unpicked_players: errorData.unpicked_players,
          fpl_teams: errorData.fpl_teams,
          current_user: errorData.current_user,
          league: errorData.league,
        }
      });
    });
  }
}

function updateDraftPickAsync (data) {
  return {
    type: UPDATE_DRAFT_PICK,
    payload: data
  };
}
