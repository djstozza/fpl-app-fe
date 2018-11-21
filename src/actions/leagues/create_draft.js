import { CREATE_DRAFT, SHOW_LEAGUE_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader } from './../../api-config';

export default function createDraft (leagueId) {
  return dispatch => {
    axios({
      url: `${API_ROOT}/leagues/${leagueId}/create_draft.json`,
      method: 'POST',
      ...getLocalStorageHeader(),
    }).then(res => {
      dispatch(createDraftAsync(res.data));
    }).catch(error => {
      const data = error.response.data
      dispatch({
        type: SHOW_LEAGUE_ERRORS,
        payload: {
          commissioner: data.commissioner,
          current_user: data.current_user,
          fpl_teams: data.fpl_teams,
          league: data.league,
          error: error.response
        }
      });
    });
  }
}

function createDraftAsync (data) {
  return {
    type: CREATE_DRAFT,
    payload: data
  };
}
