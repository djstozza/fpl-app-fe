import { CREATE_MINI_DRAFT_PICK, SHOW_MINI_DRAFT_PICK_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function createMiniDraftPick (leagueId, outListPositionId, playerId, fplTeamListId) {
  return dispatch => {
    axios({
      url: `${ API_ROOT }/leagues/${ leagueId }/mini_draft_picks.json`,
      method: 'POST',
      ...getLocalStorageHeader(),
      data: {
        list_position_id: outListPositionId,
        in_player_id: playerId,
        fpl_team_list_id: fplTeamListId,
      }
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(createMiniDraftPickAsync(res.data));
    }).catch(error => {
      const data = error.response.data;
      setLocalStorageHeader(error.response);
      const payload = {
        league: data.league,
        fpl_team_list: data.fpl_team_list,
        fpl_teams: data.fpl_teams,
        out_players: data.out_players,
        current_mini_draft_pick_user: data.current_mini_draft_pick_user,
        current_user: data.current_user,
        mini_draft_picks: data.mini_draft_picks,
        mini_draft_picked: data.mini_draft_picked,
        all_players_picked: data.all_players_picked,
        unpicked_players: data.unpicked_players,
        current_mini_draft_pick: data.current_mini_draft_pick,
        error: error.response,
      }
      dispatch({
        type: SHOW_MINI_DRAFT_PICK_ERRORS,
        payload: payload,
      });
    });
  }
}

function createMiniDraftPickAsync (data) {
  return {
    type: CREATE_MINI_DRAFT_PICK,
    payload: data
  };
}
