import { PASS_MINI_DRAFT_PICK, SHOW_MINI_DRAFT_PICK_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function passMiniDraftPick (leagueId, fplTeamListId) {
  return dispatch => {
    axios({
      url: `${ API_ROOT }/leagues/${ leagueId }/pass_mini_draft_picks.json`,
      method: 'POST',
      ...getLocalStorageHeader(),
      data: {
        fpl_team_list_id: fplTeamListId,
      }
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(passMiniDraftPickAsync(res.data));
    }).catch(error => {
      const data = error.response.data;
      setLocalStorageHeader(error.response);
      dispatch({
        type: SHOW_MINI_DRAFT_PICK_ERRORS,
        payload: {
          league: data.league,
          fpl_teams: data.fpl_teams,
          out_players: data.list_positions,
          current_mini_draft_pick_user: data.current_mini_draft_pick_user,
          current_user: data.current_user,
          mini_draft_picks: data.mini_draft_picks,
          mini_draft_picked: data.mini_draft_picked,
          all_players_picked: data.all_players_picked,
          unpicked_players: data.unpicked_players,
          current_mini_draft_pick: data.current_mini_draft_pick,
          error: data.error,
        }
      });
    });
  }
}

function passMiniDraftPickAsync (data) {
  return {
    type: PASS_MINI_DRAFT_PICK,
    payload: data
  };
}
