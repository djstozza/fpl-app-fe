import { FETCH_FPL_TEAM, SHOW_FPL_TEAM_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function fetchFplTeam (params) {
  return dispatch => {
    axios({
      url: `${API_ROOT}/fpl_teams/${params['fpl_team_id']}.json`,
      method: 'GET',
      params: params,
      ...getLocalStorageHeader(),
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(fetchFplTeamAsync(res.data));
    }).catch(error => {
      const data = error.response.data;
      setLocalStorageHeader(error.response);
      dispatch({ type: SHOW_FPL_TEAM_ERRORS, payload: { error: error.response } });
    });
  }
}

function fetchFplTeamAsync (data) {
  return {
    type: FETCH_FPL_TEAM,
    payload: data
  };
}
